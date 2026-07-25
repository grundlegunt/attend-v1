# Security

## Baseline
Use managed identity; MFA for privileged staff; secure sessions; server-side RBAC on every staff operation; least privilege by module and location; HTTPS; encryption at rest/in transit; secret management; CSP/CSRF protections; validated inputs; dependency and container scanning; rate limits; structured security logs and tested backups.

## Payment scope reduction
Use provider-hosted/tokenized collection. Never log or store PAN/CVV. Verify webhook signatures against raw bodies, reject stale/replayed events and keep secrets server-only. Tokenization reduces scope but is not a claim of PCI compliance; obtain a formal scope assessment.

## Authorization examples
Servers order and close permitted tabs but cannot alter prices; kitchen staff change fulfillment status but cannot access customer/payment data; box office can transact tickets but not roles; managers authorize voids/comps; owners access finance and configuration. UI visibility is convenience, never enforcement.

## Privacy and audit
Classify personal data, minimize retention, encrypt sensitive fields, define deletion/export workflows and redact operational telemetry. Audit privileged access, refunds, transfers, price/role changes and cash adjustments. Audit records are tamper-evident and access-restricted.

## Threats to test
Credential stuffing, broken object authorization, QR replay, webhook replay, idempotency bypass, seat-race abuse, price tampering, stored XSS in notes, privilege escalation, tab-link guessing, excessive data exposure and insider refund fraud.

## Operational gates
Threat model, incident runbooks, backup restore drill, key rotation, penetration test, vendor review and jurisdiction-specific privacy/alcohol/tax/legal review are required before real operations.
