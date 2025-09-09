// Wiki Application JavaScript
class WikiApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPageContent();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Botones tipo "Explorar" y "back-button" en el contenido dinámico
        document.getElementById('contentBody').addEventListener('click', (e) => {
            const target = e.target.closest('[data-page]');
            if (target) {
                e.preventDefault();
                const page = target.getAttribute('data-page');
                this.navigateToPage(page);
            }
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const mobileToggle = document.getElementById('mobileMenuToggle');
                
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        }
    }

    handleResize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('collapsed', 'open');
            mainContent.classList.remove('sidebar-collapsed');
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }

    navigateToPage(pageName) {
        if (this.currentPage === pageName) return;

        // Update active navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update breadcrumb
        this.updateBreadcrumb(pageName);

        // Load page content
        this.loadPage(pageName);

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('open');
        }

        this.currentPage = pageName;
    }

    updateBreadcrumb(pageName) {
        const breadcrumb = document.getElementById('breadcrumb');
        const pageNames = {
            'home': 'Inicio',
            'ciclo-vida': 'Ciclo de Vida del Software',
            'cascada': 'Modelo en Cascada',
            'prototipos': 'Modelo de Prototipos',
            'rad': 'Modelo RAD',
            'evolutivo': 'Modelo Evolutivo',
            'espiral': 'Modelo en Espiral',
            'v-model': 'Modelo en V',
            'docente': 'Información del Docente'
        };

        breadcrumb.innerHTML = `<span class="breadcrumb-item active">${pageNames[pageName] || pageName}</span>`;
    }

    loadPage(pageName) {
        const contentBody = document.getElementById('contentBody');
        
        // Show loading
        contentBody.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        // Simulate loading delay for better UX
        setTimeout(() => {
            const pageContent = this.getPageContent(pageName);
            contentBody.innerHTML = pageContent;
        }, 300);
    }

    getPageContent(pageName) {
        const pages = {
            'ciclo-vida': this.getCicloVidaContent(),
            'cascada': this.getCascadaContent(),
            'prototipos': this.getPrototiposContent(),
            'rad': this.getRADContent(),
            'evolutivo': this.getEvolutivoContent(),
            'espiral': this.getEspiralContent(),
            'v-model': this.getVModelContent(),
            'docente': this.getDocenteContent()
        };

        return pages[pageName] || this.getHomeContent();
    }

    getCicloVidaContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#home" class="back-button" data-page="home">
                        <i class="fas fa-arrow-left"></i> Volver al inicio
                    </a>
                    <h1><i class="fas fa-sync-alt"></i> Modelos de Ciclo de Vida del Software</h1>
                    
                    <p>Un <strong>Modelo de Proceso de Software</strong> es una representación abstracta y simplificada del proceso real de desarrollo de software. Cada modelo describe una sucesión de fases y cómo se conectan entre sí, siendo más o menos adecuado según las características del proyecto.</p>
                    
                    <h2>La Realidad del Desarrollo de Software</h2>
                    <p>El siguiente gráfico ilustra las discrepancias comunes entre la necesidad del cliente, la interpretación del equipo y el resultado final, destacando la importancia de un modelo de proceso bien definido.</p>
                    
                    <img src="https://github.com/user-attachments/assets/42802c63-b7a2-4ec2-86e2-5010bd49374a" alt="Discrepancias en el desarrollo de software" style="max-width: 100%; height: auto;">
                    
                    <h2>Modelos Principales</h2>
                    <div class="models-grid">
                        <div class="model-card">
                            <h3><i class="fas fa-stream"></i> Modelo Lineal Secuencial (Cascada)</h3>
                            <p>Enfoque secuencial donde el proceso avanza desde el análisis hasta el mantenimiento.</p>
                            <a href="#cascada" class="btn btn-primary" data-page="cascada">Explorar</a>
                        </div>
                        
                        <div class="model-card">
                            <h3><i class="fas fa-cube"></i> Modelo de Prototipos</h3>
                            <p>Construye una versión preliminar del software para entender mejor los requisitos.</p>
                            <a href="#prototipos" class="btn btn-primary" data-page="prototipos">Explorar</a>
                        </div>
                        
                        <div class="model-card">
                            <h3><i class="fas fa-rocket"></i> Modelo RAD</h3>
                            <p>Desarrollo Rápido de Aplicaciones con ciclos cortos y entrega rápida.</p>
                            <a href="#rad" class="btn btn-primary" data-page="rad">Explorar</a>
                        </div>
                        
                        <div class="model-card">
                            <h3><i class="fas fa-seedling"></i> Modelo Evolutivo</h3>
                            <p>Desarrollo de una versión inicial que se va refinando a través de ciclos.</p>
                            <a href="#evolutivo" class="btn btn-primary" data-page="evolutivo">Explorar</a>
                        </div>
                        
                        <div class="model-card">
                            <h3><i class="fas fa-spinner"></i> Modelo en Espiral</h3>
                            <p>Combina prototipos y cascada con análisis de riesgos explícito.</p>
                            <a href="#espiral" class="btn btn-primary" data-page="espiral">Explorar</a>
                        </div>
                        
                        <div class="model-card">
                            <h3><i class="fas fa-check-double"></i> Modelo en V</h3>
                            <p>Enfatiza la verificación y validación en cada etapa del ciclo de vida.</p>
                            <a href="#v-model" class="btn btn-primary" data-page="v-model">Explorar</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getCascadaContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#ciclo-vida" class="back-button" data-page="ciclo-vida">
                        <i class="fas fa-arrow-left"></i> Volver a Ciclo de Vida
                    </a>
                    <h1><i class="fas fa-stream"></i> Modelo Lineal Secuencial (Cascada)</h1>
                    
                    <p>También conocido como "Ciclo de Vida Básico", sugiere un enfoque secuencial donde el proceso avanza desde el análisis hasta el mantenimiento, pasando por diseño, codificación y pruebas.</p>
                    
                    <h2>Fases del Modelo en Cascada</h2>
                    
                    <div class="phases-list">
                        <div class="phase-item">
                            <h3>1. Preanálisis</h3>
                            <p>Se especifica la necesidad del cliente, se estudia la viabilidad (tiempo y dinero) y se define el alcance del proyecto. La premisa clave es: <strong>"EL CLIENTE NUNCA SABE LO QUE QUIERE"</strong>.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>2. Análisis de Requisitos</h3>
                            <p>Se recopilan y detallan los requisitos del software, incluyendo su función, rendimiento e interfaces.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>3. Diseño</h3>
                            <p>Se traducen los requisitos a una representación del software, enfocándose en la estructura de datos y la arquitectura. Se divide en diseño de alto nivel (arquitectónico) y diseño detallado.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>4. Codificación</h3>
                            <p>El diseño se traduce a un formato legible por la máquina.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>5. Pruebas</h3>
                            <p>Se verifica la lógica interna y las funciones externas para asegurar que las entradas produzcan los resultados esperados. Incluye pruebas de unidad, integración, sistema y aceptación.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>6. Implantación</h3>
                            <p>El sistema se pone en uso en un entorno real.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>7. Mantenimiento</h3>
                            <p>Se realizan cambios para corregir errores, adaptarse a nuevos entornos o añadir funcionalidades. Los tipos de mantenimiento son: preventivo/perfectivo, correctivo y evolutivo.</p>
                        </div>
                    </div>
                    
                    <h2>Ventajas</h2>
                    <ul>
                        <li>Organización clara y fases que no se mezclan.</li>
                        <li>Planificación sencilla y fácil de entender para los usuarios.</li>
                        <li>Ideal para proyectos rígidos con requisitos bien definidos.</li>
                    </ul>
                    
                    <h2>Desventajas</h2>
                    <ul>
                        <li>Los proyectos reales raramente son secuenciales.</li>
                        <li>Es difícil para el cliente establecer todos los requisitos al inicio.</li>
                        <li>No hay una versión funcional del software hasta las etapas finales.</li>
                        <li>Un error no detectado a tiempo puede ser desastroso y costoso.</li>
                    </ul>
                    
                    <img src="https://github.com/user-attachments/assets/260c11f8-7fd9-4d02-872e-6c1ac3035d09" alt="Mapa conceptual del modelo en cascada" style="max-width: 100%; height: auto;">
                </div>
            </div>
        `;
    }

    getPrototiposContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#ciclo-vida" class="back-button" data-page="ciclo-vida">
                        <i class="fas fa-arrow-left"></i> Volver a Ciclo de Vida
                    </a>
                    <h1><i class="fas fa-cube"></i> Modelo de Prototipos</h1>
                    
                    <img src="https://github.com/user-attachments/assets/dcd39a06-d71a-4a2d-b550-3104b7d38df0" alt="Modelo de prototipos en ingeniería de software" style="max-width: 100%; height: auto;">
                    
                    <p>Pertenece a los modelos de desarrollo evolutivo y se enfoca en construir una versión preliminar del software para entender mejor los requisitos del usuario, especialmente cuando estos no están claros. Se inicia definiendo objetivos globales, se identifican los requisitos conocidos y se construye un prototipo rápidamente para que el cliente lo evalúe.</p>
                    
                    <h2>Características</h2>
                    <ul>
                        <li><strong>Funcional:</strong> Es una aplicación que funciona.</li>
                        <li><strong>Rápido y de bajo costo:</strong> Se construye con rapidez y con una inversión mínima.</li>
                        <li><strong>Iterativo:</strong> Evoluciona a través de la retroalimentación del cliente.</li>
                    </ul>
                    
                    <h2>Tipos de Prototipos</h2>
                    <ul>
                        <li><strong>Evolutivo:</strong> Entrega un sistema funcional que se desarrolla en incrementos.</li>
                        <li><strong>Desechable:</strong> Se utiliza para validar o derivar requisitos poco claros y tiene un período de vida corto.</li>
                        <li><strong>Rápido:</strong> Se enfoca en las áreas de mayor riesgo; si funciona, se continúa el desarrollo; si no, se descarta sin grandes pérdidas.</li>
                    </ul>
                    
                    <h2>Ventajas</h2>
                    <ul>
                        <li>Reduce la incertidumbre, el tiempo y los costos.</li>
                        <li>Mejora la comunicación entre desarrolladores y clientes y aumenta la aceptación del sistema.</li>
                        <li>Útil cuando el cliente no puede detallar todos los requisitos de entrada, procesamiento o salida.</li>
                    </ul>
                    
                    <h2>Desventajas</h2>
                    <ul>
                        <li>Se pueden descuidar aspectos como la calidad y el mantenimiento a largo plazo.</li>
                        <li>El cliente puede generar falsas expectativas al ver un prototipo funcional, confundiéndolo con el sistema final.</li>
                        <li>El desarrollador puede caer en la tentación de convertir el prototipo en el sistema final sin considerar los estándares de calidad.</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getRADContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#ciclo-vida" class="back-button" data-page="ciclo-vida">
                        <i class="fas fa-arrow-left"></i> Volver a Ciclo de Vida
                    </a>
                    <h1><i class="fas fa-rocket"></i> Modelo de Desarrollo Rápido de Aplicaciones (DRA/RAD)</h1>
                    
                    <img src="https://github.com/user-attachments/assets/17c99fd9-249a-4b85-b5ba-f59138ce2261" alt="RAD model" style="max-width: 100%; height: auto;">
                    
                    <p>Es un modelo de desarrollo ágil que enfatiza un ciclo de desarrollo corto, priorizando la entrega rápida de prototipos funcionales sobre una planificación detallada.</p>
                    
                    <p>Su objetivo es entregar sistemas de alta calidad en poco tiempo (normalmente de 60 a 90 días) y con un bajo costo.</p>
                    
                    <h2>Características Principales</h2>
                    <ul>
                        <li><strong>Desarrollo iterativo:</strong> Se crean prototipos en ciclos cortos.</li>
                        <li><strong>Interacción constante con el usuario:</strong> Los clientes participan activamente en la validación.</li>
                        <li><strong>Flexibilidad:</strong> Permite ajustes continuos en los requisitos.</li>
                        <li><strong>Uso de herramientas de desarrollo rápido:</strong> Se emplean frameworks y generadores de código para acelerar el proceso.</li>
                    </ul>
                    
                    <h2>Fases del DRA</h2>
                    <div class="phases-list">
                        <div class="phase-item">
                            <h3>1. Modelado de Gestión</h3>
                            <p>Se analiza el flujo de información para responder qué información se genera, quién la produce, a dónde va y quién la procesa.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>2. Modelado de Datos</h3>
                            <p>Se definen los objetos de datos necesarios para soportar el negocio, sus atributos y relaciones.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>3. Modelado de Procesos</h3>
                            <p>Se transforman los objetos de datos para implementar las funciones de negocio, describiendo cómo se añaden, modifican o eliminan.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>4. Generación de Aplicaciones</h3>
                            <p>Se reutilizan componentes existentes o se crean nuevos utilizando herramientas automáticas.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>5. Pruebas y Entrega</h3>
                            <p>Se prueban los nuevos componentes y las interfaces, aprovechando que muchos componentes reutilizados ya han sido verificados.</p>
                        </div>
                    </div>
                    
                    <h2>Ventajas</h2>
                    <ul>
                        <li>Permite acortar el tiempo de desarrollo de un proyecto.</li>
                        <li>Mayor flexibilidad y menor codificación manual.</li>
                        <li>Los productos se crean en función de la retroalimentación constante de los clientes.</li>
                    </ul>
                    
                    <h2>Desventajas</h2>
                    <ul>
                        <li>El usuario puede generarse sobreexpectativas con prototipos estéticamente agradables pero de baja funcionalidad.</li>
                        <li>El progreso puede ser más difícil de medir que en modelos tradicionales.</li>
                        <li>Renuncia a la estructura rígida de los procesos tradicionales, lo que puede llevar a prácticas sin control si no se gestiona bien.</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getEvolutivoContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#ciclo-vida" class="back-button" data-page="ciclo-vida">
                        <i class="fas fa-arrow-left"></i> Volver a Ciclo de Vida
                    </a>
                    <h1><i class="fas fa-seedling"></i> Modelo Evolutivo</h1>
                    
                    <img src="https://github.com/user-attachments/assets/c6d2cc65-1731-49f3-9d83-3e619a78e09d" alt="Modelo evolutivo" style="max-width: 100%; height: auto;">
                    
                    <p>Este modelo se basa en el desarrollo de una versión inicial que se va refinando a través de ciclos de retroalimentación con el cliente o usuario final. Las fases de especificación, desarrollo y validación se entrelazan en lugar de ser secuenciales. Es especialmente útil cuando no todo el personal necesario está disponible desde el inicio.</p>
                    
                    <h2>Tipos de Desarrollo Evolutivo</h2>
                    <div class="phases-list">
                        <div class="phase-item">
                            <h3>1. Desarrollo Exploratorio</h3>
                            <p>El objetivo es trabajar con el cliente para explorar sus requisitos y entregar un sistema final. Se parte de los requisitos mejor comprendidos y se añaden nuevas características a medida que el cliente las propone.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>2. Prototipos Desechables</h3>
                            <p>El objetivo es comprender los requisitos del cliente para desarrollar una mejor definición de estos. El prototipo se enfoca en experimentar con los requisitos que no se comprenden del todo y luego se descarta.</p>
                        </div>
                    </div>
                    
                    <h2>Ventajas</h2>
                    <ul>
                        <li>Reduce el tiempo de desarrollo inicial al implementar funcionalidad parcial.</li>
                        <li>Disminuye los riesgos al basarse en la retroalimentación sobre los avances.</li>
                        <li>Facilita la adaptación a cambios al acotar el tamaño de los incrementos.</li>
                    </ul>
                    
                    <h2>Desventajas</h2>
                    <ul>
                        <li><strong>Proceso no visible:</strong> Si el desarrollo es rápido, puede ser costoso generar documentación para cada versión, dificultando la medición del progreso por parte de los gestores.</li>
                        <li><strong>Estructura deficiente:</strong> Los cambios continuos tienden a corromper la estructura del software, haciendo que incorporar nuevas modificaciones sea cada vez más difícil y costoso. Por esta razón, se recomienda principalmente para sistemas pequeños y medianos.</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getEspiralContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#ciclo-vida" class="back-button" data-page="ciclo-vida">
                        <i class="fas fa-arrow-left"></i> Volver a Ciclo de Vida
                    </a>
                    <h1><i class="fas fa-spinner"></i> Modelo en Espiral</h1>
                    
                    <img src="https://github.com/user-attachments/assets/63ed26f7-5337-45a3-b987-813e4d1cbde2" alt="UK spiral model" style="max-width: 100%; height: auto;">
                    
                    <p>Este modelo representa el proceso de software como una espiral, donde cada ciclo corresponde a una fase del proceso. Combina características del modelo de prototipos y del modelo en cascada, pero añade un elemento clave: el <strong>análisis de riesgos</strong> explícito en cada etapa.</p>
                    
                    <h2>Sectores de Cada Ciclo</h2>
                    <p>Cada ciclo de la espiral se divide en cuatro sectores:</p>
                    
                    <div class="phases-list">
                        <div class="phase-item">
                            <h3>1. Determinar objetivos, alternativas y restricciones</h3>
                            <p>Se definen los objetivos específicos de la fase, las restricciones del proceso y del producto, y se traza un plan de gestión.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>2. Evaluar alternativas, identificar y resolver riesgos</h3>
                            <p>Se realiza un análisis detallado de los riesgos identificados y se definen estrategias para reducirlos (por ejemplo, crear un prototipo si hay incertidumbre en los requisitos).</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>3. Desarrollar y verificar el producto del siguiente nivel</h3>
                            <p>Se elige un modelo de desarrollo (ej. prototipado, cascada) basado en los riesgos dominantes y se construye la siguiente versión del producto.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h3>4. Planificar la siguiente fase</h3>
                            <p>Se revisa el proyecto y se decide si continuar con el siguiente ciclo de la espiral, preparando los planes correspondientes.</p>
                        </div>
                    </div>
                    
                    <h2>Ventajas</h2>
                    <ul>
                        <li>Permite un alto control sobre las actividades en cada ciclo.</li>
                        <li>La gestión y el control de riesgos están explícitamente definidos en cada etapa.</li>
                    </ul>
                    
                    <h2>Desventajas</h2>
                    <ul>
                        <li>Requiere una considerable habilidad para la evaluación de riesgos; si un riesgo importante no se considera, las consecuencias pueden ser graves.</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getVModelContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#ciclo-vida" class="back-button" data-page="ciclo-vida">
                        <i class="fas fa-arrow-left"></i> Volver a Ciclo de Vida
                    </a>
                    <h1><i class="fas fa-check-double"></i> Modelo en V</h1>
                    
                    <img src="https://github.com/user-attachments/assets/ae1714cb-1d9f-4c78-8d74-5a5014cf8b8b" alt="Modelo en V" style="max-width: 100%; height: auto;">
                    
                    <p>El Modelo en V es una evolución del modelo en cascada que enfatiza la <strong>verificación y validación</strong> en cada etapa del ciclo de vida. Visualmente, se representa como una "V", donde el lado izquierdo corresponde a las fases de desarrollo (especificación y diseño) y el lado derecho a las fases de prueba y validación. Cada fase de desarrollo tiene una fase de prueba correspondiente.</p>
                    
                    <h2>Fases del Modelo en V</h2>
                    
                    <h3>Lado Izquierdo (Desarrollo)</h3>
                    <div class="phases-list">
                        <div class="phase-item">
                            <h4>Requisitos del Sistema</h4>
                            <p>Se definen las necesidades generales del sistema. <em>Corresponde a las Pruebas de Aceptación</em>.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Requisitos del Software</h4>
                            <p>Se detallan los requisitos específicos del software. <em>Corresponde a las Pruebas del Sistema</em>.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Diseño de Arquitectura</h4>
                            <p>Se establece la estructura del sistema y sus componentes principales. <em>Corresponde a las Pruebas de Integración</em>.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Diseño Detallado</h4>
                            <p>Se especifican los módulos, clases y algoritmos. <em>Corresponde a las Pruebas Unitarias</em>.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Implementación y Codificación</h4>
                            <p>Se traduce el diseño en código fuente.</p>
                        </div>
                    </div>
                    
                    <h3>Lado Derecho (Pruebas y Validación)</h3>
                    <div class="phases-list">
                        <div class="phase-item">
                            <h4>Pruebas Unitarias</h4>
                            <p>Se prueban componentes individuales del código para verificar que cada módulo funcione correctamente.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Pruebas de Integración</h4>
                            <p>Se prueban módulos combinados para verificar su interacción y detectar errores de comunicación.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Pruebas del Sistema</h4>
                            <p>Se valida que el software completo cumpla con los requisitos especificados.</p>
                        </div>
                        
                        <div class="phase-item">
                            <h4>Pruebas de Aceptación</h4>
                            <p>Se verifica que el sistema cumpla con las expectativas del usuario final en un entorno real.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getDocenteContent() {
        return `
            <div class="page active">
                <div class="article">
                    <a href="#home" class="back-button" data-page="home">
                        <i class="fas fa-arrow-left"></i> Volver al inicio
                    </a>
                    <h1><i class="fas fa-user-tie"></i> Información del Instructor</h1>
                    
                    <div class="instructor-details">
                        <div class="instructor-card">
                            <h2>Jeison Mauricio Delgado González</h2>
                            
                            <div class="credentials">
                                <h3>Credenciales</h3>
                                <ul>
                                    <li>Ing. de Sistemas</li>
                                    <li>Esp. Gerencia de Proyectos</li>
                                    <li>Máster en Gestión de la Innovación y la Investigación</li>
                                    <li>MSc. Gestión de CTel</li>
                                </ul>
                            </div>
                            
                            <div class="contact-info">
                                <h3>Información de Contacto</h3>
                                <p><strong>Email:</strong> jeisonmauriciod@saber.uis.edu.co</p>
                            </div>
                            
                            <div class="social-links">
                                <a href="https://www.linkedin.com/in/jeisonmauriciod/" target="_blank" class="btn btn-primary">
                                    <i class="fab fa-linkedin"></i> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getHomeContent() {
    // Asegura que el contenido de inicio se muestre correctamente
    const home = document.getElementById('home');
    return home ? home.innerHTML : '';
    }

    loadPageContent() {
        // Add additional CSS for dynamic content
        const style = document.createElement('style');
        style.textContent = `
            .models-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin: 2rem 0;
            }
            
            .model-card {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .model-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            .model-card h3 {
                color: #1e293b;
                margin-bottom: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .model-card p {
                color: #64748b;
                margin-bottom: 1rem;
                line-height: 1.6;
            }
            
            .phases-list {
                margin: 1.5rem 0;
            }
            
            .phase-item {
                background: #f8fafc;
                padding: 1.5rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border-left: 4px solid #667eea;
            }
            
            .phase-item h3, .phase-item h4 {
                color: #1e293b;
                margin-bottom: 0.5rem;
            }
            
            .phase-item p {
                color: #4b5563;
                margin: 0;
            }
            
            .instructor-details {
                margin-top: 2rem;
            }
            
            .instructor-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
            }
            
            .instructor-card h2 {
                font-size: 1.75rem;
                margin-bottom: 1.5rem;
            }
            
            .credentials, .contact-info {
                margin: 1.5rem 0;
                text-align: left;
            }
            
            .credentials h3, .contact-info h3 {
                font-size: 1.125rem;
                margin-bottom: 0.75rem;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .credentials ul {
                list-style: none;
                padding: 0;
            }
            
            .credentials li {
                padding: 0.25rem 0;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .contact-info p {
                color: rgba(255, 255, 255, 0.8);
                margin: 0;
            }
            
            .social-links {
                margin-top: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wikiApp = new WikiApp();
});
