<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\services\CrudService;
use App\Models\Document;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    protected $crudService;

    public function __construct(
        CrudService $crudService,
    )
    {
        $this->crudService = $crudService;
    }


    public function index()
    {
        $documents = $this->crudService->index(Document::class);
        return response()->json($documents);
    }

    public function show($id)
    {
        $document = $this->crudService->show(Document::class, $id);
        return response()->json($document);
    }

    public function destroy($id)
    {
        $this->crudService->destroy(Document::class, $id);
        return response()->json(['message' => 'Document supprimé avec succès']);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validators = Validator::make($request->documents, [
            'documents.*.document_type_id' => 'required|exists:type_documents,id',
            'documents.*.file' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            'documents.*.deleted' => 'nullable|boolean',
        ]);

        $demandeId = $request->input('demande_id');

        if ($validators->fails()) {
            return $this->sendError($validators->errors(), 400);
        }

        try {
            $documents = [];
            foreach ($request->documents as $key => $docData) {
                if (isset($docData['deleted']) && $docData['deleted'] === true) {
                    $this->deleteDocument($docData);
                    continue;
                }

                $file = $request->file("documents.$key.file");

                if ($file && $file->isValid()) {
                    $fileData = $this->uploadFile($file, $demandeId);
                    $document = $this->storeOrUpdateDocument($fileData, $docData, $demandeId);
                    $documents[] = $document;
                }
            }

            return $this->sendResponse(
                ['documents' => $documents,],
                'Documents créés, mis à jour ou supprimés avec succès',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }

    public function fileUpload(Request $request, $id = null)
    {
        Validator::make($request->all(), [
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
        ]);
        $document = $id ? Document::find($id) : new Document();
        if ($id && !$document) {
            return $this->sendError('Aucun document trouvé', 404);
        }
        if ($request->hasFile('file')) {
            if ($id && $document->file_path && Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }
            $fileOrginalName = $request->file('file')->extension();
            $document->file_name = $typeDocument->libelle . '_' . uniqid() . '.' . $fileOrginalName;
            $document->file_type = $request->file('file')->getMimeType();
            $document->file_size = $request->file('file')->getSize();
            $document->document_id = $request->input('document_parent_id') ?? null;
            $filePath = $request->file('file')->storeAs($typeDocument->libelle, $document->file_name, 'public');
            $document->file_path = $filePath;
            $document->documentable_id = $dossierDemande->id;
            $document->documentable_type = DossierDeDemande::class;
            $savedDocument = $document->save();
            $fileUrls[] = url('storage/' . $filePath);
            return $this->sendResponse($id ? "Mise à jour réussie" : "Création réussie", $document, $id ? 200 : 201);
        }
    }

    private function uploadFile($file, $demandeId)
    {
        $originalFileName = $file->getClientOriginalName();
        $fileName = 'demande_' . $demandeId . '_' . uniqid() . '_' . $originalFileName;
        $filePath = $file->storeAs('dossier_de_demande/documents', $fileName, 'public');
        $fileUrl = Storage::url($filePath);

        return [
            'file_name' => $originalFileName,
            'file_path' => $filePath,
            'file_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'file_url' => $fileUrl,
        ];
    }

    private function storeOrUpdateDocument($fileData, $docData, $demandeId)
    {
        $existingDocument = Document::where('documentable_id', $demandeId)
            ->where('documentable_type', DossierDeDemande::class)
            ->where('type_document_id', $docData['document_type_id'])
            ->first();

        if ($existingDocument) {
            return $this->updateDocument($existingDocument, $fileData);
        } else {
            return $this->createDocument($fileData, $docData, $demandeId);
        }
    }

    private function updateDocument($existingDocument, $fileData)
    {
        $existingDocument->file_path = $fileData['file_path'];
        $existingDocument->file_name = $fileData['file_name'];
        $existingDocument->file_type = $fileData['file_type'];
        $existingDocument->file_size = $fileData['file_size'];
        $existingDocument->save();

        return $existingDocument;
    }

    private function createDocument($fileData, $docData, $demandeId)
    {
        try {
            $document = new Document();
            $document->type_document_id = $docData['document_type_id'];
            $document->file_path = $fileData['file_path'];
            $document->file_name = $fileData['file_name'];
            $document->file_type = $fileData['file_type'];
            $document->file_size = $fileData['file_size'];
            $document->documentable_id = $demandeId;
            $document->documentable_type = DossierDeDemande::class;
            $document->save();

            return $document;
        }catch (\Exception $exception){
            return  $exception->getMessage();
        }
    }

    private function deleteDocument($docData)
    {
        $document = Document::where('documentable_id', $docData['documentable_id'])
            ->where('documentable_type', DossierDeDemande::class)
            ->where('type_document_id', $docData['document_type_id'])
            ->first();

        if ($document) {
            Storage::delete($document->file_path);
            $document->delete();
        }
    }

    public function getDocumentsByDocumentableId($documentableId)
    {
        $documents = Document::where('documentable_id', $documentableId)->get();
        return response()->json($documents);
    }

    public function getDocumentByDocumentableIdAndDocumentTypeId($documentableId, $documentTypeId)
    {
        $document = Document::where('documentable_id', $documentableId)
            ->where('type_document_id', $documentTypeId)
            ->first();
        return response()->json($document);
    }

    public function getDocumentByReservationId($reservationId)
    {
        $documents = Document::where('documentable_id', $reservationId)
            ->where('documentable_type', Reservation::class)
            ->get();
    }
}
