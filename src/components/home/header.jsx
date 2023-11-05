import { useEffect } from "react";
import ClipboardJS from 'clipboard';
import "./home.css";
import banner from "../../assets/images/banner.jpg"
import illustration from "../../assets/images/cta-illustration.jpg"
function Header() {
    useEffect(() => {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
        });

        window.addEventListener('scroll', () => {
            const navigation = document.querySelector('.navigation');
            if (navigation) {
                if (navigation.getBoundingClientRect().top > 50) {
                    navigation.classList.add('nav-bg');
                } else {
                    navigation.classList.remove('nav-bg');
                }
            }
        });

        let clipInit = false;
        document.querySelectorAll('code').forEach((code) => {
            const text = code.textContent;
            if (text.length > 2) {
                if (!clipInit) {
                    const clip = new ClipboardJS('.copy-to-clipboard', {
                        text: (trigger) => {
                            const text = trigger.previousElementSibling.textContent;
                            return text.replace(/^\$\s/gm, '');
                        },
                    });
                    clipInit = true;
                }
                code.insertAdjacentHTML('afterend', '<span className="copy-to-clipboard">copy</span>');
            }
        });

        document.querySelectorAll('.copy-to-clipboard').forEach((element) => {
            element.addEventListener('click', () => {
                element.textContent = 'copied';
            });
        });
    }, []);

    const handleInputChange = (event) => {
        if (event.target.value) {
            event.target.classList.add('active');
        } else {
            event.target.classList.remove('active');
        }
    };


    return (

        <div className="bg-light">
            <header className="sticky-top navigation">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light ">
                        <a className="navbar-brand" href="/">CodingJudge
                        </a>
                        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navigation">
                            <i className="ti-align-right h4 text-dark"></i></button>
                        <div className="collapse navbar-collapse text-center" id="navigation">
                            <ul className="navbar-nav mx-auto align-items-center">
                                <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="/problems-all">problems</a></li>
                            </ul>
                            <a href="/login" className="btn btn-sm btn-outline-primary ml-lg-4 me-3">Log In</a>
                            <a href="/signup" className="btn btn-sm btn-primary ml-lg-4">Sign Up</a>
                        </div>
                    </nav>
                </div>
            </header>


        </div>
    )
}
export default Header;