function initCustomCursor() {
    gsap.set('#product-display span.stickyCursor', { yPercent: -50, xPercent: -50 });

    let activeImage;
    gsap.utils.toArray("#product-display").forEach((el) => {
        let image = el.querySelector('span.stickyCursor'),
            setX, setY,
            align = e => {
                setX(e.clientX);
                setY(e.clientY);
            },
            startFollow = () => document.addEventListener("mousemove", align),
            stopFollow = () => document.removeEventListener("mousemove", align),
            fade = gsap.to(image, {autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow});
        
        el.addEventListener('mouseenter', (e) => {
            fade.play();
            startFollow();
            if (activeImage) {
                gsap.set(image, {x: gsap.getProperty(activeImage, "x"), y: gsap.getProperty(activeImage, "y")});
            }
            activeImage = image;
            setX = gsap.quickTo(image, "x", {duration: 0.6, ease: "power3"}),
            setY = gsap.quickTo(image, "y", {duration: 0.6, ease: "power3"})
            align(e);
        });
        
        el.addEventListener('mouseleave', () => fade.reverse());
    });
}

initCustomCursor();