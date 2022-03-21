import React from 'react'
import KommunicateChat from "../chat"

const Footer = () => {
    return (
        <footer class="text-center text-lg-start bg-dark text-muted bg-bottom" style={{ height: "12vh" }}>

            <section
                class="d-flex justify-content-center justify-content-lg-between p-4 "
            >




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

                <div class="me-5 d-none d-lg-block">
                    <span style={{ color: 'white' }}>Copyright &copy; Mayank</span>
                </div>
                <div>
                    <KommunicateChat />
                </div>
            </section >
        </footer >

    )
}

export default Footer