I made some changes to the app keeping in mind some parts of it needed work. The following are some of the things that caught my eye.

* UI definitely needed to use a modern css framework with all the `<br/>`'s sprinkled throughout the html. TailwindCSS was used to improve the look and feel of the application.
* Switched out the static list of advocates to utilize the Postgres db and fetch data. What stood out to me was the call to `const data = await db.select().from(advocates);` automatically I decided to refactor immediately and create a Repository and Service class.
* There was no testing around the application. I decided to use Jest and implement a few unit tests that would form the basis for more testing.

The UI I crafted could be done much better. Admittedly I don't have a flair for design so I had to make due with basic css styling provided by Tailwind. 

All in all I had alot of fun working on the test application! If given enough time I feel adding E2E tests would meet the standards for sound software engineering principles. Cypress would be my number one choice for an E2E framework. Also setting up a CI/CD pipeline that would run various tests and linting (if needed) to help with adding robustness to the software in general.
