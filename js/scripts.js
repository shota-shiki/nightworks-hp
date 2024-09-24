document.addEventListener('DOMContentLoaded', () => {
    // カレントメニュー
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // ハッシュリンクの処理を関数化
    function handleHashLink(hash) {
        if (hash) {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 0);
            }
        }
    }

    // ページ読み込み時にハッシュを処理
    handleHashLink(window.location.hash);

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHash = item.getAttribute('href').split('#')[1];
            history.pushState(null, '', `#${targetHash}`);
            handleHashLink(`#${targetHash}`);
        });
    });

    window.addEventListener('popstate', () => {
        handleHashLink(window.location.hash);
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
});
