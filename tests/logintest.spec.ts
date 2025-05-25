import { test, expect } from '@playwright/test';

test('login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
});


test('login with incorrect credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('wronguser');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('wrongpassword');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials');
});

test('login with empty credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Please enter your login and password');
});

test('login with empty password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Please enter your password');
});

test('login with empty login', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Please enter your login');
});

test('login with special characters in credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('!@#$%^&*()');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('!@#$%^&*()');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials');
});


test('login with long credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('a'.repeat(256)); // Assuming max length is less than 256
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('b'.repeat(256)); // Assuming max length is less than 256
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials');
});


test('login with SQL injection attempt', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill("' OR '1'='1");
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill("' OR '1'='1");
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials');
});

test('login with XSS attempt', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('<script>alert("XSS")</script>');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('<script>alert("XSS")</script>');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error-message')).toHaveText('Invalid credentials');
});

test('login with valid credentials and check account balance', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account balance
  const balance = await page.getByTestId('account-balance').textContent();
  expect(balance).toBeDefined();
});

test('login with valid credentials and check transaction history', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check transaction history
  const transactions = await page.getByTestId('transaction-history').textContent();
  expect(transactions).toBeDefined();
});

test('login with valid credentials and check account details', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account details
  const accountDetails = await page.getByTestId('account-details').textContent();
  expect(accountDetails).toBeDefined();
});

test('login with valid credentials and check user profile', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check user profile
  const userProfile = await page.getByTestId('user-profile').textContent();
  expect(userProfile).toBeDefined();
});

test('login with valid credentials and check notifications', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check notifications
  const notifications = await page.getByTestId('notifications').textContent();
  expect(notifications).toBeDefined();
});

test('login with valid credentials and check security settings', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check security settings
  const securitySettings = await page.getByTestId('security-settings').textContent();
  expect(securitySettings).toBeDefined();
});
test('login with valid credentials and check support options', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check support options
  const supportOptions = await page.getByTestId('support-options').textContent();
  expect(supportOptions).toBeDefined();
});
test('login with valid credentials and check account settings', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account settings
  const accountSettings = await page.getByTestId('account-settings').textContent();
  expect(accountSettings).toBeDefined();
});

test('login with valid credentials and check transaction limits', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check transaction limits
  const transactionLimits = await page.getByTestId('transaction-limits').textContent();
  expect(transactionLimits).toBeDefined();
});

test('login with valid credentials and check account statements', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account statements
  const accountStatements = await page.getByTestId('account-statements').textContent();
  expect(accountStatements).toBeDefined();
});

test('login with valid credentials and check account preferences', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account preferences
  const accountPreferences = await page.getByTestId('account-preferences').textContent();
  expect(accountPreferences).toBeDefined();
});

test('login with valid credentials and check account notifications', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account notifications
  const accountNotifications = await page.getByTestId('account-notifications').textContent();
  expect(accountNotifications).toBeDefined();
});

test('login with valid credentials and check account security', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account security
  const accountSecurity = await page.getByTestId('account-security').textContent();
  expect(accountSecurity).toBeDefined();
});

test('login with valid credentials and check account activity', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account activity
  const accountActivity = await page.getByTestId('account-activity').textContent();
  expect(accountActivity).toBeDefined();
});

test('login with valid credentials and check account preferences', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account preferences
  const accountPreferences = await page.getByTestId('account-preferences').textContent();
  expect(accountPreferences).toBeDefined();
});

test('login with valid credentials and check account settings', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account settings
  const accountSettings = await page.getByTestId('account-settings').textContent();
  expect(accountSettings).toBeDefined();
});

test('login with valid credentials and check account details', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account details
  const accountDetails = await page.getByTestId('account-details').textContent();
  expect(accountDetails).toBeDefined();
});

test('login with valid credentials and check account balance', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerlo');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('dksadakj');
  await page.getByTestId('login-button').click();
  
  // Check if the user is logged in
  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  // Check account balance
  const accountBalance = await page.getByTestId('account-balance').textContent();
  expect(accountBalance).toBeDefined();
});