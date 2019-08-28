import Component from '../Component.js';
import Header from './Header.js';
import SignUp from '../auth/SignUp.js';
import { userSignUp, userSignIn} from '../../services/todo-api.js';

class AuthApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const errors = dom.querySelector('.errors');
        const signUpContainer = dom.querySelector('#signup-container');
        const signUp = new SignUp({
            onSignUp: newUser => {
                errors.textContent = '';

                return userSignUp(newUser)
                    .then(user => {
                        sucess(user);
                    })
                    .catch(err =>{
                        errors.textContent = err;
                    });
            }
        });
        signUpContainer.appendChild(signUp.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                    <p class="errors"></p>
                    <section class="no-display" id="signup-container">
                        <p class="switch">
                            <button id="signin-button">Already a User?</button>
                        </p>
                    </section>
                    <section id="signin-container">
                        <p class="switch">
                            <button id="signup-button">Create A New Account</button>
                        </p>
                    </section>
                </main>
            </div>
        `;
    }
}

export default AuthApp;