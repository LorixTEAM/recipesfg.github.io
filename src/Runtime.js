document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const allRecipeLinks = document.querySelectorAll('.content-section ul li a');
    const backButtons = document.querySelectorAll('.back-button');
    const contentSections = document.querySelectorAll('.content-section');

    // Функция для активации раздела
    function activateSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
        }
    }

    // Функция для активации пункта меню
    function activateMenuItem(item) {
        menuItems.forEach(menuItem => menuItem.classList.remove('active-menu-item'));
        if (item) item.classList.add('active-menu-item');
    }

    // Обработка кликов по пунктам меню
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            activateMenuItem(this);
            activateSection(this.getAttribute('href').substring(1));
        });
    });

    // Обработка кликов по ссылкам на рецепты
    allRecipeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const parentSection = this.closest('.content-section');
            
            // Сохраняем ID родительского раздела в data-атрибут
            this.dataset.parentSection = parentSection ? parentSection.id : 'all-recipe';
            
            const menuItem = document.querySelector(`.menu-item[href="#${this.dataset.parentSection}"]`);
            activateMenuItem(menuItem);
            activateSection(targetId);
        });
    });

    // Обработка кнопки "Назад"
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const recipeSection = this.closest('.content-section');
            const parentLink = document.querySelector(`a[href="#${recipeSection.id}"]`);
            
            // Получаем сохраненный ID родительского раздела
            const parentId = parentLink ? parentLink.dataset.parentSection : 'all-recipe';
            
            const menuItem = document.querySelector(`.menu-item[href="#${parentId}"]`) || 
                           document.querySelector('.menu-item[href="#all-recipe"]');
            
            activateMenuItem(menuItem);
            activateSection(parentId);
        });
    });

    // Инициализация
    activateMenuItem(document.querySelector('.menu-item[href="#all-recipe"]'));
    activateSection('all-recipe');
});
