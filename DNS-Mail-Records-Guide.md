# DNS Mail Records Guide: DMARC & SPF

To ensure your hotel's emails (such as booking confirmations and inquiries from `jodhpur@hotelratnawali.com`) are reliably delivered and not marked as spam, you need to add specific **DNS Records** to your domain registrar (e.g., GoDaddy, Namecheap, Google Domains).

Please log into your domain registrar's control panel, navigate to the **DNS Management / DNS Settings** section, and add the following records:

## 1. SPF Record (Sender Policy Framework)
An SPF record tells email providers (like Gmail or Outlook) which servers are authorized to send email on behalf of your domain.

*   **Type:** `TXT`
*   **Name/Host:** `@` (or leave blank if `@` is not accepted, representing your root domain)
*   **Value:** `v=spf1 include:_spf.google.com ~all`
    *(Note: Replace `_spf.google.com` with your specific email hosting provider's SPF include string if you are not using Google Workspace).*
*   **TTL:** `1 Hour` (or default)

## 2. DMARC Record (Domain-based Message Authentication, Reporting, and Conformance)
A DMARC record tells email providers what to do if an email fails the SPF check. It helps prevent spoofing and phishing.

*   **Type:** `TXT`
*   **Name/Host:** `_dmarc` (this will create `_dmarc.hotelratnawalijodhpur.com`)
*   **Value:** `v=DMARC1; p=quarantine; rua=mailto:admin@hotelratnawalijodhpur.com;`
    *(Note: The `rua` tag specifies where summary reports of email authentication should be sent. Ensure this inbox exists).*
*   **TTL:** `1 Hour` (or default)

---

### How to Verify
Once added, DNS propagation can take anywhere from a few minutes to 24 hours. You can verify your records are live using free tools like [MxToolBox SPF Check](https://mxtoolbox.com/spf.aspx) and [MxToolBox DMARC Check](https://mxtoolbox.com/DMARC.aspx).
