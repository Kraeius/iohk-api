IOHK Metadata Task

Setup

Make sure you have the latest "node.js" and "yarn" installed
User "yarn install" for dependencies
Eslint, Husky and Prettier used for a clean code

Running Tests

To open the cypress UI use "yarn cypress-cli"
To run the test headlessly, use "yarn cypress-headless"

GitHub Actions

It's added to be triggered on every push and pull_request
It also has the cron job to run at 9pm each night
It's possible to run it manually as well

Bugs

It's kind of hard to know what is really required on a response but I assumed that what we got was actually what we expected on GET responses. For POST, we have a thing or two;
- For GET response, everything seems to be in order except the description of the "Amazing Coin". It would be a bug If we would see that description on prod. UI.
- For POST response, as I assumed, we expect to see the response only for the subject and key(s) we sent, but while subjects are shown as expected, keys are somehow work differently;
- "decimals" and "policy" seems to be shown even If we don't want them. "subject" is also shown but I assumed it would be normal to show it so we can see which subject we are seeing the data.