document.addEventListener('DOMContentLoaded', () => {
    // カレントメニューとナビゲーション
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            if (href.startsWith('https://about.night-works.jp/')) {
                e.preventDefault();
                window.location.href = href;
            }
            // 同一ページ内のアンカーリンクの場合はデフォルトの動作を許可
        });
    });

    // スクロール処理
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionBottom = sectionTop + section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('current');
            if (item.getAttribute('href').split('#')[1] === current) {
                item.classList.add('current');
            }
        });
    });

    // よくある質問（タブ切り替え）
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // アコーディオン
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            content.classList.toggle('active');
        });
    });

    // お問い合わせ完了ダイアログ
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('送信が完了しました');
            this.reset();
        });
    }

    // ハンバーガーメニュー
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ページ読み込み時のハッシュ処理
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    }
});
