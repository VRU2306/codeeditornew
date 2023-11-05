import { useEffect } from "react";
import ClipboardJS from 'clipboard';
import "./home.css";
import banner from "../../assets/images/banner.jpg"
import illustration from "../../assets/images/cta-illustration.jpg"
function Home() {
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
                    new ClipboardJS('.copy-to-clipboard', {
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



    return (

        <div className="">
            <section className="section pb-0 ">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-7 text-center text-lg-left">
                            <h1 className="mb-4">CodingJudge: Your Code, Our Verdict</h1>
                            <p className="mb-4">CodingJudge offers a dynamic platform for coding enthusiasts to challenge themselves. Submit your code, face rigorous
                                test cases, and elevate your coding skills. Whether you're a novice or a seasoned coder, our interactive environment
                                encourages learning and competition. Hone your problem-solving abilities, learn from your mistakes, and measure your
                                skills against a global community. Join us to discover where your coding prowess stands</p>
                        </div>
                        <div className="col-lg-4 d-lg-block d-none">
                            <img src={banner} alt="illustration" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /banner -->

            <!-- topics --> */}
            <section className="section pb-0">
                <div className="container">
                    <h2 className="section-title">Features of CodingJudge</h2>
                    <div className="row">
                        {/* <!-- topic --> */}
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card match-height">
                                <div className="card-body">
                                    <i className="card-icon ti-panel mb-4"></i>
                                    <h3 className="card-title h4">Compile Code</h3>
                                    <p className="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                                    {/* <a href="list.html" rel="list" className="stretched-link"></a> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- topic --> */}
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card match-height">
                                <div className="card-body">
                                    <i className="card-icon ti-credit-card mb-4"></i>
                                    <h3 className="card-title h4">Test Code</h3>
                                    <p className="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                                    {/* <a href="list.html" className="stretched-link"></a> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- topic --> */}
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card match-height">
                                <div className="card-body">
                                    <i className="card-icon ti-package mb-4"></i>
                                    <h3 className="card-title h4">Submit Code</h3>
                                    <p className="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                                    {/* <a href="list.html" className="stretched-link"></a> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- topic --> */}
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card match-height">
                                <div className="card-body">
                                    <i className="card-icon ti-settings mb-4"></i>
                                    <h3 className="card-title h4">Detailed Sol.</h3>
                                    <p className="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                                    {/* <a href="list.html" className="stretched-link"></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /topics -->

            <!-- faq --> */}
            <section className="section pb-0">
                <div className="container">
                    <h2 className="section-title">Mostly Asked Questions</h2>
                    <div className="row masonry-wrapper">
                        {/* <!-- faq item --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Will updates also be free?</h3>
                                    <p className="card-text content">Lorem, <a href="https://examplesite.com">link</a> <em>ipsum</em> dolor sit amet consectetur adipisicing elit. Cumque praesentium nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae maxime perspiciatis iste placeat architecto, mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum omnis vel sed temporibus. mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum
                                        omnis vel sed temporibus. mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit
                                        illo, unde cum omnis vel sed temporibus.</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- faq item --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Discounts for students and Non Profit Organizations?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                                        maxime perspiciatis iste placeat architecto.</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- faq item --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">I need something unique, Can you make it?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                                        ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum omnis vel sed temporibus,
                                        repudiandae impedit nam ad enim porro, qui labore fugiat quod suscipit fuga necessitatibus. Perferendis,
                                        ipsum?</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- faq item --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Is there any documentation and support?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                                        ut ab quibusdam.</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- faq item --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Any refunds?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit recusandae
                                        maxime perspiciatis iste placeat architecto.</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- faq item --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">What is a product key?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /faq -->

            <!-- call to action --> */}
            <section className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-center d-lg-block d-none">
                            <img src={illustration} className="img-fluid" alt="" />
                        </div>
                        <div className="col-lg-8 text-lg-left text-center">
                            <h2 className="mb-3">Still Didn&rsquo;t Find Your Answer?</h2>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam <br /> nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                            <a href="contact.html" className="btn btn-primary">Submit a ticket</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /call to action --> */}

        </div>
    )
}
export default Home;