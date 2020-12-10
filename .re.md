# Backend Developer Challengue

The assignment is designed to check your coding and problem-solving skills. We suggest you spend a maximum of 4-5 hours on it.

Things we require your code to have:

- Domain model design (usage of DDD concepts: aggregates, value objects, domain services, etc)
- Messaging (Queues, Events, Commands)
- Code organization (modularity, dependencies between modules, etc)
- Exception handling and logging
- Writing and organizing tests
- Task-based asynchronous programming
- Deployment Process

  **Note:** No UI needed.

## Requirements

User catalog personalization.

### Auth Module

- When the email exists and password is correct a new token is generated for further requests.
- When the email exists and the password is incorrect the API must respond "Oops! wrong password".
- When a new user is created a welcome email is sent to its inbox.

### Listing Module

- The user can search for a business using a term
- The user can list all available listings depending on its city.
- The user can sort the listings by all the available params.
  Listing shape example:

```
[
  {
    "name": "Consolidated Moving & Storage SRL",
    "description": "39 Years of Professional Moving Services Packing Moving Storage Local & Long Distance Fully Licensed & Insured WSIB Certified Guaranteed Competitive Quotations",
    "country": "Dominican Republic",
    "city": "Santo Domingo",
    "zip_code": 10123,
    "address": "542 Mount Pleasant Santo Domingo",
    "phone": "+1 (809) 654-0983",
    "tags": ["services", "storage", "movements"],
    "website": "https://www.consolidatedmoving.com.do",
    "categories": [{ "id": 1, "name": "Movements", "points": 2 }],
    "payment_methods": [
      { "id": 1, "name": "Visa" },
      { "id": 1, "name": "Mastercard" }
    ],
    "schedule": [
      { "id": 100, "day": 1, "open": "7:00", "close": "18:00" },
      { "id": 101, "day": 2, "open": "7:00", "close": "18:00" },
      { "id": 102, "day": 3, "open": "7:00", "close": "18:00" },
      { "id": 103, "day": 4, "open": "7:00", "close": "18:00" },
      { "id": 104, "day": 5, "open": "7:00", "close": "18:00" }
    ],
    "languages": [{ "id": 1, "language": "spanish" }],
    "logo": "https://picsum.photos/200/300"
  },
  {
    "name": "Affordable Movers and Packers INC",
    "description": "Looking for trust worthy and efficient service from local movers? You won’t be disappointed by our team of Affordable Movers! With the help of our professional movers, you will be ensured of an efficient relocation.",
    "country": "Dominican Republic",
    "city": "Santiago",
    "zip_code": 34123,
    "address": "23 John St Rd, Santiago",
    "phone": "+1 (849) 546-1334",
    "tags": ["movement", "storage", "packs"],
    "website": "https://www.affordabledo.com.do",
    "categories": [
      { "id": 1, "name": "Movements", "points": 7 },
      { "id": 7, "name": "Packing", "points": 2 }
    ],
    "payment_methods": [
      { "id": 1, "name": "Visa" },
      { "id": 1, "name": "Mastercard" },
      { "id": 1, "name": "American Express" }
    ],
    "schedule": [
      { "id": 100, "day": 1, "open": "9:00", "close": "13:00" },
      { "id": 101, "day": 2, "open": "9:00", "close": "13:00" },
      { "id": 102, "day": 3, "open": "9:00", "close": "13:00" },
      { "id": 103, "day": 4, "open": "9:00", "close": "13:00" },
      { "id": 104, "day": 5, "open": "9:00", "close": "13:00" }
    ],
    "languages": [{ "id": 1, "language": "english" }],
    "logo": "https://picsum.photos/200/300"
  }
]
```

## Deliverables

1. Use REST or GraphQL to build the API.
2. Use the Typescript as language.
3. Use any database as data store.
4. Use Microsoft Azure as a cloud provider to deploy, make sure we can play with the API.
5. Setup a CI server to run your tests, we must be able to check all tests passing.

## Nice to have (not required)

1. Use a search engine (Elastic Search or Azure Cognitive Search)
2. Use Azure Functions
3. Dockerize and deploy your application using GitHub Actions
