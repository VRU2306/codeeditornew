import { useEffect } from "react";
import ClipboardJS from 'clipboard';
import "./home.css";
function Footer() {
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

        <div className="bg-light ms-3">
            <footer>
                <div className="container">
                    <div className="row align-items-center border-bottom py-5">
                        <div className="col-lg-4">
                            <ul className="list-inline footer-menu text-center text-lg-left">
                                <li className="list-inline-item"><a href="/">Home</a></li>
                                <li className="list-inline-item"><a href="/problems-all">Problems</a></li>
                                {/* <!-- <li className="list-inline-item"><a href="search.html">JD Evaluator</a></li>
                 --> */}
                            </ul>
                        </div>
                        <div className="col-lg-4 text-center mb-4 mb-lg-0">
                            <a className="navbar-brand" href="/">
                                CodingJudge
                            </a>
                        </div>
                        <div className="col-lg-4">
                            <ul className="list-inline social-icons text-lg-right text-center">
                                <li className="list-inline-item"><a href="#"><i className="ti-facebook"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="ti-twitter-alt"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="ti-github"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="ti-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-4 text-center">
                        <small className="text-gray">Copyright © CodingJudge </small>
                    </div>
                </div>
            </footer>

        </div>
    )
}
export default Footer;