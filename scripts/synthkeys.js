const synthKeys = document.getElementById('synth-keys');
const synthKeysGenerator = () => {
    const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];

    keys.forEach(key => {
        // create the element 
        const keyElement = document.createElement('div');
        // set the class for styling 
        keyElement.classList.add('synth-key');
        // add a button element inside the div
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.addEventListener('click', () => {
            console.log(`${key} key pressed`);
        });
        keyElement.appendChild(buttonElement);
        // append the element to the container
        synthKeys.appendChild(keyElement);
    });
};



synthKeysGenerator();