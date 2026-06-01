# Confetti API Wrapper

[![Confetti](https://circleci.com/gh/confetti/confetti-node.svg?style=shield)](https://circleci.com/gh/confetti/confetti-node)

A TypeScript-first Node.js wrapper for the Confetti API with full type safety.

## Installation

```bash
npm install confetti
```

## Usage

### Instance Methods

```javascript
import Confetti from 'confetti'

const confetti = new Confetti({ apiKey: 'your-api-key' })

const events = await confetti.events.findAll()
const event = await confetti.events.find(1)
const contacts = await confetti.contacts.findAll()
const newContact = await confetti.contacts.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
})
```

### Static Methods

```javascript
import Confetti from 'confetti'

const events = await Confetti.events.findAll({ apiKey: 'your-api-key' })
const event = await Confetti.events.find(1, { apiKey: 'your-api-key' })
const contacts = await Confetti.contacts.findAll({ apiKey: 'your-api-key' })
const newContact = await Confetti.contacts.create(
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  },
  { apiKey: 'your-api-key' },
)
```

### Authentication

Authenticate with either an API key or an OAuth access token:

```javascript
new Confetti({ apiKey: 'your-api-key' })
new Confetti({ accessToken: 'your-oauth-access-token' })
```

If both are provided, the API key takes precedence. Access tokens are sent as
`Authorization: Bearer <token>`; API keys as `Authorization: apikey <key>`.

### TypeScript

```typescript
import Confetti, { Event, Contact, Ticket } from 'confetti'

const confetti = new Confetti({ apiKey: 'your-api-key' })

const events: Event[] = await confetti.events.findAll()
const event: Event = await confetti.events.find(1)

const events = await confetti.events.findAll({
  filter: {
    signupType: 'rsvp',
  },
  sort: 'startDate',
  include: ['categories'],
})
```

## Resources

- **Events** - `findAll`, `find`
- **Contacts** - `findAll`, `find`, `create`
- **Tickets** - `findAll`, `find`, `create`
- **Payments** - `findAll`, `find`
- **Webhooks** - `findAll`, `find`, `create`, `delete`
- **Workspaces** - `findAll`, `find`
- **Categories** - `findAll`, `find`
- **TicketBatches** - `findAll`, `find`

## CLI

The package ships a `confetti` command for signing in with OAuth and exercising
the API from a terminal — handy for testing and exploration.

```bash
# Sign in through your browser (OAuth Authorization Code + PKCE).
# You authenticate and pick a workspace in the browser; tokens are stored in
# ~/.config/confetti/credentials.json (0600) and refreshed automatically.
npx confetti auth login

npx confetti auth status
npx confetti auth logout
```

Once signed in, commands map 1:1 onto the SDK — `confetti <resource> <method>`,
where `<method>` is `findAll`, `find`, `create`, `update`, or `delete` (whichever
the resource supports). Results print as JSON.

```bash
confetti events findAll -o '{"filter":{"signupType":"rsvp"},"include":"categories"}'
confetti events find 1 -o '{"include":"workspace"}'
confetti contacts create -d '{"firstName":"John","lastName":"Doe","email":"john@example.com"}'
confetti events update 1 -d '{"name":"New name"}'
confetti webhooks delete 7
```

Flags: `-d/--data <json>` (or `--data-file <path>`) for create/update bodies,
`-o/--options <json>` for method options (`filter`/`include`/`sort`/`page`),
`--host`/`--protocol` to target another environment (also read from
`CONFETTI_API_HOST`/`CONFETTI_API_PROTOCOL`), `--api-key` to use an API key
instead of the stored OAuth session, and `--no-browser` to print the authorize
URL instead of opening a browser.

## Development

```bash
npm install
npm run lint
npm test
npm run build
```
