import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form standard">
                <div>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="Your Email">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" required>
                </div>
                <div>
                    <button>Sign Up</button>
                </div>
            </form>
        `;
    }
}

export default SignUp;