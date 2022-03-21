import React from 'react'

const Footer = () => {
    return (
        <footer class="text-center text-lg-start bg-dark text-muted">

            <section
                class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
            >

                <div class="me-5 d-none d-lg-block">
                    <span style={{ color: 'white' }}>Get connected with us on social networks:</span>
                </div>


                <div>
                    <a href="https://www.facebook.com/profile.php?id=100003677217916" class="me-4 text-reset">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="" class="me-4 text-reset">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="instagram.com/mayank_k7/" class="me-4 text-reset">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/mayank-kumar-5285531b8/" class="me-4 text-reset">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/Mayankk7" class="me-4 text-reset">
                        <i class="fab fa-github"></i>
                    </a>
                </div>

            </section >
        </footer >

    )
}

export default Footer