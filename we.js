const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  const container = document.getElementById("achievements-container");

  // Загрузка и рендер «о нас»
  async function loadAchievements() {
    try {
      const res  = await fetch('http://127.0.0.1:5000//api/catalog');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Ожидаем, что data — массив, и нас интересует data[0].we
      const we = Array.isArray(data) && data[0] && Array.isArray(data[0].we)
        ? data[0].we
        : [];

      renderAchievements(we);
    } catch (err) {
      console.error("Ошибка загрузки «О нас»:", err);
      container.innerHTML = "<p>Не удалось загрузить информацию.</p>";
    }
  }

  function renderAchievements(data) {
    container.innerHTML = '';  // очищаем перед отрисовкой

    if (data.length === 0) {
      container.innerHTML = "<p>Нет достижений для отображения.</p>";
      return;
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "achievement";

      const image = document.createElement("div");
      image.className = "achievement-image";
      image.style.backgroundImage = `url(${item.image})`;

      const textBlock = document.createElement("div");
      textBlock.className = "achievement-text";

      const title = document.createElement("h3");
      title.textContent = item.title;

      const text = document.createElement("p");
      text.textContent = item.text;

      textBlock.append(title, text);
      card.append(image, textBlock);
      container.append(card);
    });
  }

  // Запускаем
  loadAchievements();