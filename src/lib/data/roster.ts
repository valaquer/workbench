export interface RosterGirl {
	name: string;
	age: number;
	bg: string;
	img: string;
}

export const rosterGirls: RosterGirl[] = [
	// Row 1 (clipped top — real photos, only bottom 1/3 visible)
	{ name: 'Mira', age: 24, bg: '#2D1F2E', img: '/mira.jpg' },
	{ name: 'Elara', age: 28, bg: '#1F2D2E', img: '/elara.jpg' },
	{ name: 'Yuki', age: 22, bg: '#2E2D1F', img: '/yuki.jpg' },
	{ name: 'Dani', age: 26, bg: '#1F2E2A', img: '/dani.jpg' },
	// Row 2 (full — real girls)
	{ name: 'Valentina', age: 25, bg: '#2E1F27', img: '/valentina-add.jpg' },
	{ name: 'Jiwoo', age: 21, bg: '#2A1F2E', img: '/jiwoo-adq.jpg' },
	{ name: 'Sophie', age: 27, bg: '#2E261F', img: '/sophie-aeq.jpg' },
	{ name: 'Avery', age: 32, bg: '#1F2E1F', img: '/avery-adx.jpg' },
	// Row 3 (full — real girls)
	{ name: 'Sara', age: 23, bg: '#2E2A1F', img: '/sara-afb.jpg' },
	{ name: 'Nadia', age: 29, bg: '#1F272E', img: '/nadia-afr.jpg' },
	{ name: 'Hina', age: 20, bg: '#2E1F1F', img: '/hina-age.jpg' },
	{ name: 'Adaeze', age: 26, bg: '#1F2E28', img: '/adaeze-agw.jpg' },
	// Row 4 (clipped bottom — new girls, only top 1/3 visible)
	{ name: 'Lina', age: 28, bg: '#2D2E1F', img: '/lina.jpg' },
	{ name: 'Reva', age: 22, bg: '#1F2B2E', img: '/reva.jpg' },
	{ name: 'Kaya', age: 25, bg: '#2E1F25', img: '/kaya.jpg' },
	{ name: 'Zuri', age: 24, bg: '#252E1F', img: '/zuri.jpg' },
];
