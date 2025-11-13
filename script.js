document.addEventListener("DOMContentLoaded", () => {
    // ==== Аккордеон ====
    const accordions = document.querySelectorAll(".accordion-item");
    accordions.forEach(item => {
        const header = item.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            accordions.forEach(i => i !== item && i.classList.remove("active"));
            item.classList.toggle("active");
        });
    });

    // ==== Модальное окно ====
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll("img.preview").forEach(img => {
        img.classList.add("clickable");
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => (modal.style.display = "none"));
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    // ==== Тема ====
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") document.body.classList.add("dark-theme");

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    // ==== Рандомные отзывы ====
    async function fetchQuote() {
        try {
            const res = await fetch("http://api.quotable.io/random");
            if (!res.ok) throw new Error("Ошибка загрузки цитаты");
            const data = await res.json();
            return { text: `«${data.content}»`, author: data.author || "Неизвестный автор" };
        } catch {
            return { text: "«Не удалось загрузить отзыв.»", author: "Ошибка" };
        }
    }

    async function loadTestimonials(count = 4) {
        const track = document.querySelector(".carousel-track");
        track.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const testimonial = document.createElement("div");
            testimonial.classList.add("testimonial");
            testimonial.innerHTML = "<p>Загрузка...</p><h4></h4><span></span>";
            track.appendChild(testimonial);

            const quote = await fetchQuote();
            testimonial.querySelector("p").textContent = quote.text;
            testimonial.querySelector("h4").textContent = quote.author;
            testimonial.querySelector("span").textContent = "Пользователь";
        }
        initCarousel();
    }

    function initCarousel() {
        const track = document.querySelector(".carousel-track");
        const slides = document.querySelectorAll(".testimonial");
        const prevBtn = document.querySelector(".carousel-btn.prev");
        const nextBtn = document.querySelector(".carousel-btn.next");
        if (!track || slides.length === 0) return;

        let currentIndex = 0;
        const updateCarousel = () => track.style.transform = `translateX(${-currentIndex*100}%)`;

        nextBtn.addEventListener("click", () => { currentIndex = (currentIndex+1) % slides.length; updateCarousel(); });
        prevBtn.addEventListener("click", () => { currentIndex = (currentIndex-1+slides.length) % slides.length; updateCarousel(); });

        setInterval(() => { currentIndex = (currentIndex+1) % slides.length; updateCarousel(); }, 5000);
    }

    loadTestimonials(4);

    // ==== Случайные изображения ====
    async function loadRandomImages(count = 6) {
        const container = document.getElementById("images");
        container.innerHTML = "<p>Загрузка изображений...</p>";
        try {
            const res = await fetch(`https://picsum.photos/v2/list?limit=${count}`);
            const data = await res.json();
            container.innerHTML = "";
            data.forEach(img => {
                const imageEl = document.createElement("img");
                imageEl.src = `https://picsum.photos/id/${img.id}/300/200`;
                imageEl.alt = `Фото от ${img.author}`;
                imageEl.title = img.author;
                imageEl.style.margin = "5px";
                imageEl.style.borderRadius = "8px";
                imageEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
                imageEl.classList.add("preview");
                imageEl.addEventListener("click", () => {
                    modal.style.display = "block";
                    modalImg.src = imageEl.src;
                });
                container.appendChild(imageEl);
            });
        } catch {
            container.innerHTML = "<p>Не удалось загрузить изображения 😞</p>";
        }
    }

    const loadBtn = document.getElementById("loadImagesBtn");
    loadBtn.addEventListener("click", () => loadRandomImages(6));
});
