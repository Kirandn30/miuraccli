const authPrompt = [
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email:',
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*',
    },
    {
        name: 'componentName',
        message: 'What is the name of the component?',
        type: 'input',
        validate: function (value) {
            if (value.length > 5) {
                return true;
            } else {
                return 'Please provide a component name greaterthan 5 characters.';
            }
        },
    },
    {
        name: 'description',
        message: 'Provide a description for the component:',
        type: 'input',
        validate: function (value) {
            if (value.length > 10) {
                return true;
            } else {
                return 'Please provide a description greaterthan 10 characters.';
            }
        },
    }
]

module.exports = { authPrompt };