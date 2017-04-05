# swagger-include

## Example

`api.yml`

```yaml
swagger: "2.0"
info:
  version: 1.0.0
  title: Swagger Petstore

includes:
  - './pet.yml'

definitions:
  Category:
    type: object
    properties:
      id:
        type: integr
        format: int64
      name:
        type: string
```

`pet.yml`

```yaml
includes:
  - './pet/store.yml'
  - './pet/update.ytml'
```

`pet/store.yml`

```yaml
paths:
  /pet:
    post:
      tags:
        - pet
      summary: |
        Add a new pet to the store
      parameters:
        - in: body
          name: body
          description: Pet object that needs to be added to the store
          required: true
          schema:
            $ref: '#/definitions/Pet'
      responses:
        405:
          description: Invalid input

definitions:
  Pet:
    type: object
    required:
      - name
      - photoUrls
    properties:
      id:
        type: integer
        format: int64
      category:
        $ref: '#/definitions/Category'
      name:
        type: string
        example: 'doggie'
      photoUrls:
        type: array
        items:
          type: string
```

`pet/update.yml`

```yaml
paths:
  /pet:
    put:
      tags:
        - pet
      summary: |
        Update an existing pet
      parameters:
        - in: body
          name: body
          description: Pet object that needs to be added to the store
          schema:
            $ref: '#/definitions/Pet'
      responses:
        400:
          description: Invalid ID supplied
```

After `swagger-include`:

```yaml
swagger: "2.0"
info:
  version: 1.0.0
  title: Swagger Petstore

paths:
  /pet:
    post:
      tags:
        - pet
      summary: |
        Add a new pet to the store
      parameters:
        - in: body
          name: body
          description: Pet object that needs to be added to the store
          required: true
          schema:
            $ref: '#/definitions/Pet'
      responses:
        405:
          description: Invalid input
    put:
      tags:
        - pet
      summary: |
        Update an existing pet
      parameters:
        - in: body
          name: body
          description: Pet object that needs to be added to the store
          schema:
            $ref: '#/definitions/Pet'
      responses:
        400:
          description: Invalid ID supplied

definitions:
  Category:
    type: object
    properties:
      id:
        type: integr
        format: int64
      name:
        type: string
  Pet:
    type: object
    required:
      - name
      - photoUrls
    properties:
      id:
        type: integer
        format: int64
      category:
        $ref: '#/definitions/Category'
      name:
        type: string
        example: 'doggie'
      photoUrls:
        type: array
        items:
          type: string
```
