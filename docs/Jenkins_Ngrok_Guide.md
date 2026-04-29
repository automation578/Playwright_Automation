# Jenkins & ngrok — How They Work Together

## Overview

When Jenkins runs on your local machine, GitHub cannot reach it directly because your machine is behind a firewall/router and has no public IP. **ngrok** solves this by creating a secure tunnel from a public URL on the internet to your local Jenkins instance.

```
GitHub ──(webhook)──► ngrok public URL ──(tunnel)──► localhost:8080 (Jenkins)
```

---

## How Jenkins Works

Jenkins is a CI/CD automation server. It:

1. **Watches a Git repository** for changes
2. **Runs a pipeline** (defined in `Jenkinsfile`) when triggered
3. **Executes stages** — install dependencies, run tests, publish reports

### Jenkinsfile Pipeline Flow

```
Push to GitHub
     │
     ▼
Jenkins triggered
     │
     ├─ Stage 1: Checkout       → pulls latest code from GitHub
     ├─ Stage 2: Install Deps   → npm ci
     ├─ Stage 3: Install Browsers → npx playwright install
     ├─ Stage 4: Run Tests      → npx playwright test
     │
     └─ Post: Publish HTML Report
```

### Key Jenkins Concepts

| Term | Meaning |
|------|---------|
| **Pipeline** | The full CI/CD workflow defined in code |
| **Stage** | A named phase within the pipeline |
| **Agent** | The machine that runs the pipeline |
| **Build Trigger** | What causes a pipeline to start |
| **Webhook trigger** | Pipeline starts when GitHub sends a push event |

---

## How ngrok Works

ngrok is a reverse proxy/tunnel tool. It:

1. Opens a persistent connection from your machine to ngrok's cloud servers
2. Assigns a public URL (e.g., `https://abc123.ngrok-free.app`)
3. Forwards any HTTP requests that arrive at that URL to your specified local port

```
Internet ──► ngrok cloud ──► your machine (localhost:8080)
```

### Key ngrok Concepts

| Term | Meaning |
|------|---------|
| **Tunnel** | The connection between ngrok cloud and your local machine |
| **Forwarding URL** | The public HTTPS URL ngrok assigns |
| **ngrok inspector** | Local dashboard at `http://localhost:4040` — shows all requests/responses |
| **Authtoken** | Required to authenticate your ngrok account |

### ngrok Free Tier Limitations

- URL changes every time you restart ngrok
- Requires an account and authtoken
- Shows a browser warning page (does not affect webhook requests)
- Agent version must be kept up to date

---

## How They Connect — Step by Step

### 1. ngrok creates the tunnel
```powershell
ngrok http 8080
# Output: Forwarding https://abc123.ngrok-free.app -> http://localhost:8080
```

### 2. Jenkins URL is updated
Jenkins must know its own public URL:
`Manage Jenkins → System → Jenkins URL → https://abc123.ngrok-free.app/`

### 3. GitHub webhook is configured
GitHub repo → Settings → Webhooks → Add webhook:
- **Payload URL**: `https://abc123.ngrok-free.app/github-webhook/`
- **Content type**: `application/json`
- **Trigger**: Push events

### 4. Developer pushes code
```
git push origin main
     │
     ▼
GitHub sends POST to https://abc123.ngrok-free.app/github-webhook/
     │
     ▼
ngrok forwards request to http://localhost:8080/github-webhook/
     │
     ▼
Jenkins receives webhook, triggers pipeline
     │
     ▼
Playwright tests run, HTML report published
```

---

## Common Issues & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `ngrok not recognized` | ngrok not installed | `winget install ngrok.ngrok` |
| `authentication failed` | No authtoken set | `ngrok config add-authtoken <token>` |
| `agent version too old` | Outdated ngrok | `ngrok update` or `winget upgrade ngrok.ngrok` |
| `403 No valid crumb` | Jenkins CSRF protection blocking webhook | Remove `crumbIssuer` from Jenkins config.xml (requires admin) |
| `403` on webhook | GitHub plugin disabled | Enable GitHub plugin in Manage Jenkins → Plugins |
| ngrok URL changed | ngrok restarted | Update webhook URL in GitHub + Jenkins URL setting |

---

## Important Notes

- **ngrok must stay running** — if you close the terminal, the tunnel closes and webhooks stop working
- **Free tier URL changes on every restart** — you must update GitHub webhook + Jenkins URL each time
- **ngrok inspector** at `http://localhost:4040` is your best debugging tool — shows every request and response
- **Jenkins config.xml** is at `C:\ProgramData\Jenkins\.jenkins\config.xml` — requires Administrator to edit

---

## Quick Start Checklist

- [ ] ngrok installed and authtoken configured
- [ ] `ngrok http 8080` running in a terminal
- [ ] Jenkins URL set to ngrok URL (Manage Jenkins → System)
- [ ] Jenkins CSRF protection disabled
- [ ] GitHub plugin enabled in Jenkins
- [ ] Pipeline job configured with "GitHub hook trigger for GITScm polling"
- [ ] GitHub webhook pointing to `https://<ngrok-url>/github-webhook/`
- [ ] Webhook shows green checkmark in GitHub
