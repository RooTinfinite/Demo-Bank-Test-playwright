

 # Demo Bank login smoke test - playwright
[![repo_lang](https://skillicons.dev/icons?i=typescript,)](#)![image](https://github.com/user-attachments/assets/b8e4a4b1-9e91-4ed4-82e7-ccbbaba0e5d7)

 *  Automated smoke tests for the Demo Bank login functionality using Playwright.
 * ## Features Tested
 * - Successful login with valid credentials.
 * - Login attempts with incorrect, empty, or partially filled credentials.
 * - Login attempts with special characters, long input, SQL injection, and XSS payloads to verify security and input validation.
 * - Post-login checks for user interface elements such as:
 *   - Account balance
 *   - Transaction history
 *   - Account details
 *   - User profile
 *   - Notifications
 *   - Security settings
 *   - Support options
 *   - Account settings
 *   - Transaction limits
 *   - Account statements
 *   - Account preferences
 *   - Account notifications
 *   - Account security
 *   - Account activity
 * 
 * ## Usage
 * - Each test navigates to the login page, performs actions simulating user input, and asserts the expected UI state or error messages.
 * - Tests are designed to ensure both functional correctness and security robustness of the login process.
 * 
 * ## Technologies
 * - [Playwright](https://playwright.dev/) for browser automation and assertions.
* - nodejs 22v22.16.0
* - typescript
 
 * ## Test Coverage
 * - Positive and negative login scenarios.
 * - Security-related edge cases.
 * - Verification of key user dashboard features after successful login.
 */
