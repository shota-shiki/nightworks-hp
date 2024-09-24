document.addEventListener('DOMContentLoaded', () => {
    // カレントメニュー
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // すべてのデフォルト動作を防ぐ
            const href = item.getAttribute('href');
            const url = new URL(href, window.location.origin);

            if (url.hostname === 'about.night-works.jp') {
                if (window.location.hostname === 'about.night-works.jp') {
                    // 同じドメイン内での遷移
                    const hash = url.hash.substring(1);
                    const targetSection = document.getElementById(hash);
                    if (targetSection) {
                        history.pushState(null, '', url.hash);
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // 別ドメインからの遷移
                    window.location.href = href;
                }
            } else {
                // その他のリンク（例：ログインページ）
                window.location.href = href;
            }
        });
    });

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

    // よくある質問
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

    // ページ読み込み時にハッシュを処理
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
