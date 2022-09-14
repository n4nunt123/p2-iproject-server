## Endpoints
List of Avaible Endpoints:
  - `POST /register`
  - `POST /login`
  - `GET /user`
  - `GET /bookmark`
  - `POST /bookmark`
  - `GET /local/weapons`
  - `GET /local/armors`
  - `GET /local/shields`
  - `POST /erapi/weapon/:category`
  - `POST /erapi/armor/:category`
  - `POST /erapi/shield/:category`
  - `POST /erapi/talisman`

## Deployed Link
### Client
  - https://h8omoring.web.app
### Server
  - https://h8omoring.herokuapp.com

## POST /register
### Description
- Create a new User data
- Implement Hooks hashing with bcryptjs on data password
#### Request
- Body
    ```json
    {
      "username": STRING,
      "password": STRING,
      "email": STRING,
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
        "id": INTEGER,
        "email": STRING,
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Email is required" 
    }
    OR
    {
      "message": "Input must be email" 
    }
    OR
    {
      "message": "Password is required" 
    }
    OR
    {
      "message": "Password minimal 5 character" 
    }
    ```

## POST /login
### Description
- Get data from User table based on given email
- Validation input password must be same as encoded password on database
- Generate token based on payload as inputed id User
### Request
- Body
    ```json
    {
      "email": STRING,
      "password": STRING
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    {
      "access_token": STRING
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Error Email or Password Invalid"
    }
    ```

## GET /user
### Description
- Find logined user base on access_token
### Request
- user
    ```json
    {
      "id": INTEGER
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    {
      "id": INTEGER,
      "email": STRING
    }
    ```

## GET /bookmark
### Description
- Find all bookmark
### Response
_200 - OK_
- Body
    ```json
    {
      "id": INTEGER,
      "title": STRING,
      "rightHand": STRING,
      "leftHand": STRING,
      "helmet": STRING,
      "chestArmor": STRING,
      "gauntlet": STRING,
      "legArmor": STRING,
      "UserId": INTEGER,
      "User": OBJECT
    }
    ```

## POST /bookmark
### Description
- save data to local database
- after succesfully saved data, user will recieve email with mailjet
### Request
- Body
    ```json
    {
      "title": STRING,
      "rightHand": STRING,
      "leftHand": STRING,
      "helmet": STRING,
      "chestArmor": STRING,
      "gauntlet": STRING,
      "legArmor": STRING,
      "UserId": INTEGER
    }
    ```
### Response
_201 - OK_
- Body
    ```json
    {
      "title": STRING,
      "rightHand": STRING,
      "leftHand": STRING,
      "helmet": STRING,
      "chestArmor": STRING,
      "gauntlet": STRING,
      "legArmor": STRING,
      "UserId": INTEGER
    }
    ```
_404 - NOT FOUND_
- Body
    ```json
    {
      "message": "Data not found"
    }
    ```

## GET /local/weapons
### Description
- Get all datas weapons on local database for sample datas on Client
### Response
_200 - OK_
- Body
    ```json
    {
      "rows": [
        {
          "name": STRING,
          "img": STRING
        }
      ],
      "totalData": INTEGER
    }
    ```

## GET /local/armors
### Description
- Get all datas armors on local database for sample datas on Client
### Response
_200 - OK_
- Body
    ```json
    {
      "rows": [
        {
          "name": STRING,
          "img": STRING
        }
      ],
      "totalData": INTEGER
    }
    ```

## GET /local/shields
### Description
- Get all datas shields on local database for sample datas on Client
### Response
_200 - OK_
- Body
    ```json
    {
      "rows": [
        {
          "name": STRING,
          "img": STRING
        }
      ],
      "totalData": INTEGER
    }
    ```

## POST /erapi/weapon/:category
### Description
- Get data from 3rd party API Elden Ring Open Source API weapon
### Request
- Body
    ```json
    {
      "query": {
        `query weapon {
          weapon(category:"${category}" page: 0, limit:100) {
            id,
            name,
            image,
            description,
            attack{ amount, name },
            defence{ amount, name },
            scalesWith{ scaling, name },
            requiredAttributes{ amount, name },
            category,
            weight
          }
        }`
      }
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": INTEGER,
        "name": STRING,
        "image": STRING,
        "description": STRING,
        "attack": { 
          "amount": STRING,
          "name": STRING
          },
        "defence": { 
          "amount": STRING,
          "name": STRING
          },
        "scalesWith": { 
          "scaling": STRING,
          "name": STRING
          },
        "requiredAttributes": { 
          "amount": STRING,
          "name": STRING
          },
        "category": STRING,
        "weight": STRING
      },....
    ]
    ```

## POST /erapi/armor/:category
### Description
- Get data from 3rd party API Elden Ring Open Source API armor
### Request
- Body
    ```json
    {
      "query": {
        `query armor {
          armor(category:"${category}" page: 0, limit:100) {
            id,
            name,
            image,
            description,
            category,
            weight
          }
        }`
      }
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": INTEGER,
        "name": STRING,
        "image": STRING,
        "description": STRING,
        "category": STRING,
        "weight": STRING
      },....
    ]
    ```


## POST /erapi/shield/:category
### Description
- Get data from 3rd party API Elden Ring Open Source API shield
### Request
- Body
    ```json
    {
      "query": {
        `query shield {
          shield(category:"${category}" page: 0, limit:100) {
            id,
            name,
            image,
            description,
            category,
            weight
          }
        }`
      }
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": INTEGER,
        "name": STRING,
        "image": STRING,
        "description": STRING,
        "category": STRING,
        "weight": STRING
      },....
    ]
    ```

## POST /erapi/talisman
### Description
- Get data from 3rd party API Elden Ring Open Source API talisman
### Request
- Body
    ```json
    {
      "query": {
        `query talisman {
          talisman(category:"${page}" page: 0, limit:15) {
            id,
            name,
            image,
            description,
            effect
          }
        }`
      }
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": INTEGER,
        "name": STRING,
        "image": STRING,
        "description": STRING,
        "effect": STRING
      },....
    ]
    ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error" 
    }
    ```