import requests

# Replace these variables with your Keycloak server details
keycloak_url = "https://your-keycloak-server/auth"
realm = "your-realm"
client_id = "your-client-id"
client_secret = "your-client-secret"
admin_username = "admin-username"
admin_password = "admin-password"

# Step 1: Obtain an access token
token_url = f"{keycloak_url}/realms/{realm}/protocol/openid-connect/token"
token_data = {
    "grant_type": "password",
    "client_id": client_id,
    "client_secret": client_secret,
    "username": admin_username,
    "password": admin_password
}

response = requests.post(token_url, data=token_data)
response.raise_for_status()
access_token = response.json()["access_token"]

# Step 2: Register the user
user_url = f"{keycloak_url}/admin/realms/{realm}/users"
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}
user_data = {
    "username": "newuser",
    "email": "newuser@example.com",
    "firstName": "New",
    "lastName": "User",
    "enabled": True,
    "credentials": [{
        "type": "password",
        "value": "newuserpassword",
        "temporary": False
    }]
}

response = requests.post(user_url, headers=headers, json=user_data)
response.raise_for_status()

print("User registered successfully!")
