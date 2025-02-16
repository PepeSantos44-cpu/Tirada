const app = {
    // Datos de ejemplo para las 9 áreas y sus cartas
    areas: [
        {
            id: 1,
            name: "Amor",
            color: "#ffcccc",
            cards: {
                pasado: { 
                    name: "El Loco", 
                    image: "https://via.placeholder.com/80x120?text=El+Loco", 
                    meaning: "Libertad emocional en el pasado. Esta carta sugiere que has vivido experiencias que te han liberado de ataduras emocionales, permitiéndote explorar nuevas formas de amar."
                },
                presente: { 
                    name: "La Estrella", 
                    image: "https://via.placeholder.com/80x120?text=La+Estrella", 
                    meaning: "Esperanza y conexión en el presente. La Estrella indica que estás en un momento de optimismo y conexión profunda con tus emociones y con los demás."
                },
                futuro: { 
                    name: "El Sol", 
                    image: "https://via.placeholder.com/80x120?text=El+Sol", 
                    meaning: "Felicidad y armonía en el futuro. El Sol promete un futuro lleno de alegría y armonía en tus relaciones amorosas."
                },
            },
        },
        {
            id: 2,
            name: "Salud",
            color: "#ccffcc",
            cards: {
                pasado: { 
                    name: "La Muerte", 
                    image: "https://via.placeholder.com/80x120?text=La+Muerte", 
                    meaning: "Transformación en el pasado. La Muerte indica que has pasado por cambios significativos en tu salud, dejando atrás viejos hábitos."
                },
                presente: { 
                    name: "El Colgado", 
                    image: "https://via.placeholder.com/80x120?text=El+Colgado", 
                    meaning: "Reflexión en el presente. El Colgado sugiere que estás en un momento de pausa, reevaluando tu bienestar físico y mental."
                },
                futuro: { 
                    name: "La Templanza", 
                    image: "https://via.placeholder.com/80x120?text=La+Templanza", 
                    meaning: "Equilibrio en el futuro. La Templanza promete un futuro de armonía y equilibrio en tu salud."
                },
            },
        },
        // ... (repetir para las otras 7 áreas)
    ],

    // Inicialización de la aplicación
    init() {
        this.bindEvents();
    },

    // Vinculación de eventos
    bindEvents() {
        const form = document.getElementById("readingForm");
        form.addEventListener("submit", (e) => this.handleFormSubmit(e));

        const closeModalButton = document.querySelector(".close-modal");
        closeModalButton.addEventListener("click", () => this.closeModal());
    },

    // Manejo del envío del formulario
    handleFormSubmit(e) {
        e.preventDefault();
        const birthDate = document.getElementById("birthDate").value;
        const description = document.getElementById("description").value;

        // Validación básica
        if (!birthDate) {
            alert("Por favor, ingresa tu fecha de nacimiento.");
            return;
        }

        // Mostrar la sección de lectura
        document.getElementById("userForm").style.display = "none";
        document.getElementById("readingSection").hidden = false;

        // Generar las áreas
        this.generateAreas();
    },

    // Generar las áreas en la sección de lectura
    generateAreas() {
        const areasContainer = document.getElementById("areasContainer");
        areasContainer.innerHTML = "";

        this.areas.forEach((area) => {
            const areaCard = document.createElement("div");
            areaCard.className = "area-card";
            areaCard.style.backgroundColor = area.color;
            areaCard.innerHTML = `
                <h4>${area.name}</h4>
                <img src="${area.cards.pasado.image}" alt="${area.cards.pasado.name}">
                <p><strong>Pasado:</strong> ${area.cards.pasado.name}</p>
                <img src="${area.cards.presente.image}" alt="${area.cards.presente.name}">
                <p><strong>Presente:</strong> ${area.cards.presente.name}</p>
                <img src="${area.cards.futuro.image}" alt="${area.cards.futuro.name}">
                <p><strong>Futuro:</strong> ${area.cards.futuro.name}</p>
            `;
            areaCard.addEventListener("click", () => this.showInterpretation(area));
            areasContainer.appendChild(areaCard);
        });

        // Mostrar la sección de profundización
        document.getElementById("deepenSection").hidden = false;
        this.populateAreaSelect();
    },

    // Mostrar la interpretación en el modal
    showInterpretation(area) {
        const modal = document.getElementById("interpretationModal");
        const modalTitle = document.querySelector(".modal-title");
        const keywords = document.querySelector(".interpretation-keywords");
        const content = document.querySelector(".interpretation-content");

        modalTitle.textContent = area.name;
        keywords.textContent = `Cartas: Pasado - ${area.cards.pasado.name}, Presente - ${area.cards.presente.name}, Futuro - ${area.cards.futuro.name}`;
        content.innerHTML = `
            <div>
                <img src="${area.cards.pasado.image}" alt="${area.cards.pasado.name}">
                <p><strong>Pasado:</strong> ${area.cards.pasado.meaning}</p>
            </div>
            <div>
                <img src="${area.cards.presente.image}" alt="${area.cards.presente.name}">
                <p><strong>Presente:</strong> ${area.cards.presente.meaning}</p>
            </div>
            <div>
                <img src="${area.cards.futuro.image}" alt="${area.cards.futuro.name}">
                <p><strong>Futuro:</strong> ${area.cards.futuro.meaning}</p>
            </div>
        `;

        modal.hidden = false;
    },

    // Cerrar el modal
    closeModal() {
        const modal = document.getElementById("interpretationModal");
        modal.hidden = true;
    },

    // Rellenar el select para profundizar
    populateAreaSelect() {
        const select = document.getElementById("areaSelect");
        select.innerHTML = "";

        this.areas.forEach((area) => {
            const option = document.createElement("option");
            option.value = area.id;
            option.textContent = area.name;
            select.appendChild(option);
        });
    },

    // Profundizar en un área seleccionada
    deepenReading() {
        const select = document.getElementById("areaSelect");
        const selectedAreaId = select.value;
        const selectedArea = this.areas.find((area) => area.id == selectedAreaId);

        if (selectedArea) {
            this.showInterpretation(selectedArea);
        }
    },
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => app.init());