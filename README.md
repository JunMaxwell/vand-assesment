# A: Algorithm
Steps to solve the problem:
1. I take `floor` of the length of the `array` divided by `target` as numbers of itteration needed. Called it as `groupLength`.
    ```js
    const groupLength = Math.floor(array.length / target)
    ```
2. Make a `remainder` variable to store the remainder of the length of the `array` % `target`.
    ```js
    const remainder = array.length % target
    ```
3. Run a loop `target` times.
    1. Run a second loop `groupLength` times.
        1. Push the `array` element at `Random Index` to the `result` array.
            ```js
            const randomIndex = Math.floor(Math.random() * array.length)
            ```
        2. Remove the `array` element at `Random Index`.
            ```js
            array.splice(randomIndex, 1)
            ```
    2. If `remainder` is not 0 or `index` from the parent loop is lower than `remainder`, push the `array` element at `Random Index` to the `result` array and remove the element from the `array`.
        ```js
        const randomIndex = Math.floor(Math.random() * array.length)
        array.splice(randomIndex, 1)
        ```
4. If `array` is not empty, repeat the process from step 1.
5. This solution will not work if the `array` length is less than `target`.
6. This solution will not work if the `array` length is not divisible by `target`.
7. This solution will run at `O(n*log(n))` time complexity.

I've been trying to make a solution that will run at `O(log(n))` time complexity but I can't think of any.\

# B: Application
I uses Vite to bootstrap the React application.
For the UI I'm most familiar with Bootstrap so I uses react-bootstrap to build the UI. I refrain using prebuilt templates but in the process of building the UI, I find that my works will be much faster to uses some UI.

> My working experience are mostly fullstack, the frontend I work on usually are based on a working templates, UI Library or UI Framework. \
> Due to not having anydesign, and I'm not very good at designing the UI and sticking with the original forms of Bootstrap without much customization.

Using axios to fetch data from the API and then map it to the UI Table.

# Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://127.0.0.1:5173](http://127.0.0.1:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Tje build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

### `npm run preview`
Use after `npm run build` to preview the production build in the browser. \
Builds the app for production and preview it in the browser. \
Open [http://127.0.0.1:4173](http://127.0.0.1:4173) to view it in the browser.
