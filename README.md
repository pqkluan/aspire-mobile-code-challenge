# Aspire Mobile Code Challenge

This repo is an attempt for Aspire Mobile Code Challenge.

The original challenge file is locate at [docs/challenge.pdf](./docs/challenge.pdf).

The bellow snippet is the extracted content of challenge file:

```text
Mobile Code Challenge

Here is our code challenge:
https://xd.adobe.com/view/9a3f7272-f4c1-4e65-9287-89ad0f353406-cf6c/screen/32774e24-445f-467c-99ca-4fdf570c8a09/

Please implement Debit Card Screen and Set weekly spending limit screen.

You can define your own user stories (business requirements) with those designs. Those requirements should be described in README.md. Pls send us back your works via GitHub or GitLab.

Notes:
> Make the calls to a mock API server to return dummy data. We will not evaluate your server code so you can choose your own way to implement the server side.
> Unit Test is an optional but it is a very positive point.
> README.md file also shows your coding skills and experience.
> Typescript and Redux Saga are optional but recommended just because we are using them. Make sure your app can run on both iOS and Android
```

## How to run the project

### Prerequisite

Your machine need to be setup to run React Native project first. You can follow [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) to setup the environment for React Native.

**Note: This project was setup with Apple Silicon machine and haven't tested with Intel variant yet.**

### Install dependencies

To install node dependencies:

```sh
yarn
```

To install CocoaPod dependencies:

```sh
npx pod-install ios
```

### Run Android

To run Android app:

```sh
yarn android
```

### Run iOS

To run iOS app:

```sh
yarn ios
```

## Development guide

Visual Studio Code with plugins is recommended for best DX for this project.

To run the tests:

```sh
yarn test
```

To lint the project:

```sh
yarn lint
```

## API Mock

[miragejs](https://miragejs.com/docs/getting-started/introduction/) was used to mock backend APIs.

The mock file is locate at `src/api/MockServer.ts`

## Business requirements

User could access their Debit Card information by switch to the Debit Card tab in Bottom Tab UI

The Debit Card screen should masked user's card information by default. Masked card should replace the first 12 numbers of the `Primary Account Number` and `Card Security Code` with asterisk character.

From Debit Card screen, user could turn off masked mode to view the card details

From Debit Card screen, user could start set up the **Weekly spending limit** by tapping on the row with the same label. The app should navigate to Spending Limit screen afterward.

From Spending Limit screen, user could either enter the amount manually or select from one of the pre-defined options. Once the amount has been filled, user then could submit it and get navigate back to Debit Card screen.

Once the Spending Limit was enabled, the Debit Card screen should display the progress bar for this week spending.

From Debit Card screen, user could turn off the **Weekly spending limit** by tapping on the row with same label.

If user wish to enable the **Weekly spending limit** again, user could tap on **Weekly spending limit** row at Debit Card screen, the app should navigate to the Spending Limit screen with the amount pre-filled with previous submitted value.
