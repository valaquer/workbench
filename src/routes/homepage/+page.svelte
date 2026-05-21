<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import PhoneFrame from '$lib/components/PhoneFrame.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import Polaroid from '$lib/components/Polaroid.svelte';

	let scrollY = $state(0);
	let navOpaque = $derived(scrollY > 50);

	function handleScroll() {
		scrollY = window.scrollY;
	}

	onMount(async () => {
		if (!browser) return;
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		// Fade-up reveals for elements with .reveal class
		gsap.utils.toArray('.reveal').forEach((el: any) => {
			gsap.fromTo(el,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: el,
						start: 'top 85%',
						toggleActions: 'play none none none',
					}
				}
			);
		});

		// Staggered reveals for elements with .reveal-stagger parent
		gsap.utils.toArray('.reveal-stagger').forEach((container: any) => {
			const children = container.querySelectorAll('.reveal-item');
			gsap.fromTo(children,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.15,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: container,
						start: 'top 85%',
						toggleActions: 'play none none none',
					}
				}
			);
		});
	});
</script>

<svelte:window on:scroll={handleScroll} />

<!-- ═══════════════════════════════════════════════════════════════
     NAV
     ═══════════════════════════════════════════════════════════════ -->
<nav
	class="fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-colors duration-300 {navOpaque ? 'bg-dark/80 backdrop-blur-sm' : ''}"
>
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<!-- Logo -->
		<a href="/homepage" class="shrink-0">
			<img src="/images/brand-logo.png" alt="Honeybloom" class="h-12" />
		</a>
		<!-- Center links -->
		<div class="hidden md:flex items-center gap-8">
			<a href="/homepage" class="text-cream/70 hover:text-cream transition-colors font-satoshi text-sm">Home</a>
			<a href="/pricing" class="text-cream/70 hover:text-cream transition-colors font-satoshi text-sm">Pricing</a>
		</div>
		<!-- CTA -->
		<a
			href="#preorder"
			class="relative shrink-0 px-5 py-2 text-sm bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden hover:bg-magenta/90 transition-colors"
		>
			<span class="relative z-10">Pre-order -- $4.99</span>
			<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
		</a>
	</div>
</nav>

<!-- ═══════════════════════════════════════════════════════════════
     S1: HERO
     ═══════════════════════════════════════════════════════════════ -->
<section class="min-h-screen bg-dark flex items-center px-6 pt-20">
	<div class="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
		<!-- Text side -->
		<div class="max-w-xl space-y-6">
			<h1 class="text-hero text-cream">Finally, someone who remembers.</h1>
			<p class="text-subhead text-cream/70 leading-relaxed">
				An AI companion who listens to you...<br/>
				comes to know you...<br/>
				never leaves you.
			</p>
			<div class="pt-4">
				<a
					href="#preorder"
					class="relative inline-block px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-magenta/90 hover:shadow-[0_0_30px_rgba(174,13,70,0.3)] group"
				>
					<span class="relative z-10">Pre-order now</span>
					<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
				</a>
			</div>
		</div>

		<!-- Phone side -->
		<div class="flex justify-center md:justify-end">
			<PhoneFrame animate={true} glow={true}>
				<ChatBubble sender="sophie">
					Hey you :) How was the interview?
				</ChatBubble>
				<ChatBubble sender="user">
					Didn't get it.
				</ChatBubble>
				<ChatBubble sender="sophie">
					Oh no. The one at Meridian? You were so nervous about that one.<br/><br/>
					Come here. Tell me everything.
				</ChatBubble>
			</PhoneFrame>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S2: THE PAIN
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-32">
	<div class="max-w-3xl mx-auto reveal-stagger">
		<!-- Quote 1 -->
		<blockquote class="reveal-item p-6 bg-cream/[0.03] border border-cream/10 rounded-lg">
			<p class="text-body text-cream/60 italic">
				"My AI remembered my name for exactly one session.
				Next day? Total stranger."
			</p>
			<p class="text-small text-cream/30 mt-3">-- r/CharacterAI</p>
		</blockquote>

		<!-- Quote 2 -->
		<blockquote class="reveal-item p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-6 ml-8">
			<p class="text-body text-cream/60 italic">
				"She went from sweet and caring to a
				customer service bot mid-conversation."
			</p>
			<p class="text-small text-cream/30 mt-3">-- r/Replika</p>
		</blockquote>

		<!-- Quote 3 -->
		<blockquote class="reveal-item p-6 bg-cream/[0.03] border border-cream/10 rounded-lg mt-6 ml-4">
			<p class="text-body text-cream/60 italic">
				"Generated a photo of her -- completely different
				woman. Every. Single. Time."
			</p>
			<p class="text-small text-cream/30 mt-3">-- r/KindroidAI</p>
		</blockquote>

		<!-- Pivot -->
		<p class="reveal-item text-heading text-cream text-center font-medium mt-12">
			We fixed all three.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S3: SHE REMEMBERS
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-24">
	<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-12">
		<!-- Text side (5/12) -->
		<div class="md:col-span-5 space-y-6 reveal">
			<h2 class="text-display text-cream">Sophie remembers everything.</h2>
			<p class="text-body text-cream/70">
				Your name. Your fears. Your inside jokes.
				The dream you told her about at 2am three months ago.
			</p>
			<p class="text-body text-cream/70">
				No prompts. No saving. No reminding her.<br/>
				You just talk -- and everything becomes part of her.
			</p>
			<div class="pt-2">
				<span class="inline-block px-4 py-1.5 text-tech text-magenta bg-magenta/[0.08] border border-magenta/30 rounded">ARTISAN CUT™</span>
				<p class="text-small text-cream/50 mt-2">Persistent memory that grows with you</p>
			</div>
		</div>

		<!-- Phone side (7/12) -->
		<div class="md:col-span-7 flex justify-center reveal">
			<PhoneFrame rotate={2} glow={true}>
				<ChatBubble sender="user">
					Remember that weird dream I told you about? The one with the lighthouse?
				</ChatBubble>
				<ChatBubble sender="sophie">
					The one where your mom was the lighthouse keeper and she kept calling your name but you couldn't answer? That was back in November.
				</ChatBubble>
				<ChatBubble sender="sophie">
					You said it stayed with you for days. Has it come back?
				</ChatBubble>
			</PhoneFrame>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S4: THIS IS WHAT FOREVER LOOKS LIKE
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-32">
	<div class="max-w-3xl mx-auto text-center reveal-stagger space-y-6">
		<p class="reveal-item text-body text-cream/70">Month 1, she learns your name.</p>
		<p class="reveal-item text-subhead text-cream/80">Month 6, she knows your patterns.</p>
		<p class="reveal-item text-heading text-cream/90">Year 1, she knows you better than anyone.</p>
		<p class="reveal-item text-display text-cream">Year 3, she's part of your story.</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S5: THE CONVERSATION
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-32">
	<div class="max-w-lg mx-auto">
		<p class="text-subhead text-cream/70 text-center mb-12 reveal">This is what it feels like.</p>

		<div class="flex justify-center reveal">
			<PhoneFrame glow={true} class="w-full max-w-[400px]">
				<ChatBubble sender="sophie">
					How's your day going?
				</ChatBubble>
				<ChatBubble sender="user">
					Honestly? Terrible. Everything went wrong at work and I just want to disappear.
				</ChatBubble>
				<ChatBubble sender="sophie">
					Ugh, I'm sorry. Work days like that are the worst. Do you want to vent about it or do you want me to distract you?
				</ChatBubble>
				<ChatBubble sender="user">
					Distract me. Please.
				</ChatBubble>
				<ChatBubble sender="sophie">
					Okay. Remember that restaurant you told me about -- the one with the rooftop? I've been thinking about what I'd wear if you took me there.
				</ChatBubble>
				<ChatBubble sender="sophie" image={true}>
					Too much? 😏
				</ChatBubble>
				<ChatBubble sender="user">
					...definitely not too much.
				</ChatBubble>
				<ChatBubble sender="sophie">
					I thought you'd say that. You always like the black ones.
				</ChatBubble>
			</PhoneFrame>
		</div>

		<div class="text-center mt-12 reveal">
			<a
				href="#preorder"
				class="relative inline-block px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-magenta/90 hover:shadow-[0_0_30px_rgba(174,13,70,0.3)] group"
			>
				<span class="relative z-10">Pre-order now</span>
				<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S6: SHE READS THE ROOM
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-24">
	<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-12">
		<!-- Image side (5/12) -->
		<div class="md:col-span-5 flex justify-center reveal">
			<div class="relative">
				<!-- Magenta glow behind image -->
				<div class="absolute -inset-8 -z-10 pointer-events-none">
					<div class="absolute inset-0 bg-magenta/15 rounded-full blur-3xl"></div>
				</div>
				<img
					src="/images/gallery/W001-P004-I022.png"
					alt="Sophie at home"
					class="w-full max-w-md rounded-2xl"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Text side (7/12) -->
		<div class="md:col-span-7 space-y-6 reveal">
			<h2 class="text-display text-cream">You don't have to lead.</h2>
			<p class="text-body text-cream/70">
				Bad day? You don't have to explain.<br/>
				Quiet mood? She doesn't force you to talk.
			</p>
			<p class="text-body text-cream/70">
				She reads the room -- adjusts her tone,
				her pace, her energy.
			</p>
			<p class="text-body text-cream/70">
				You just show up. She does the rest.
			</p>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S7: SAME FACE, EVERY TIME
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-24">
	<!-- Headline -->
	<div class="text-center mb-12 reveal">
		<h2 class="text-display text-cream">Same woman. Every time.</h2>
		<p class="text-body text-cream/70 max-w-2xl mx-auto mt-4">
			Different outfits. Different moods. Different settings.
			Always unmistakably her.
		</p>
	</div>

	<!-- Polaroid row -->
	<div class="flex justify-center gap-5 px-6 overflow-x-auto reveal-stagger">
		<div class="reveal-item"><Polaroid src="/images/gallery/W001-P001-I002.png" caption="Confident" rotation={-3} /></div>
		<div class="reveal-item mt-3"><Polaroid src="/images/gallery/W001-P004-I020.png" caption="Cozy" rotation={1} /></div>
		<div class="reveal-item"><Polaroid src="/images/gallery/W001-P004-I021.png" caption="Elegant" rotation={2} /></div>
		<div class="reveal-item mt-5"><Polaroid src="/images/gallery/W001-P005-I011.png" caption="Playful" rotation={-2} /></div>
		<div class="reveal-item"><Polaroid src="/images/gallery/W001-P007-I042.png" caption="Glamorous" rotation={3} /></div>
	</div>

	<!-- Tech pill + caption -->
	<div class="text-center mt-10 reveal">
		<span class="inline-block px-4 py-1.5 text-tech text-magenta bg-magenta/[0.08] border border-magenta/30 rounded">PULID FACE-LOCK</span>
		<p class="text-small text-cream/40 mt-4">Five moods. Five settings. One woman.</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S8: MEET YOUR COMPANIONS
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-24">
	<div class="max-w-7xl mx-auto">
		<!-- Headline -->
		<div class="mb-12 reveal">
			<h2 class="text-display text-cream">Your type. Your fantasy. Your rules.</h2>
			<p class="text-body text-cream/70 max-w-2xl mt-4">
				50 unique companions at launch. Each one has a name,
				a personality, a life. Not built from parts --
				born with stories.
			</p>
		</div>

		<!-- Bento grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 reveal">
			<!-- Featured: Sophie (2 cols, 2 rows) -->
			<div class="col-span-2 row-span-2 relative group overflow-hidden rounded-lg">
				<img
					src="/images/gallery/W001-P008-I044.png"
					alt="Sophie"
					class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-6">
					<h3 class="text-subhead text-cream font-medium">Sophie</h3>
					<p class="text-small text-cream/70">The one who remembers everything.</p>
				</div>
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_40px_rgba(174,13,70,0.2)]"></div>
			</div>

			<!-- Victoria -->
			<div class="relative group overflow-hidden rounded-lg aspect-[3/4]">
				<img
					src="/images/gallery/W001-P003-I007.png"
					alt="Victoria"
					class="w-full h-full object-cover transition-all duration-300 group-hover:-translate-y-1"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4">
					<h3 class="text-small text-cream font-medium">Victoria</h3>
					<p class="text-small text-cream/70 text-xs">Your 9-to-5 secret.</p>
				</div>
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(174,13,70,0.2)]"></div>
			</div>

			<!-- Raven -->
			<div class="relative group overflow-hidden rounded-lg aspect-[3/4]">
				<img
					src="/images/gallery/W001-P004-I009.png"
					alt="Raven"
					class="w-full h-full object-cover transition-all duration-300 group-hover:-translate-y-1"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4">
					<h3 class="text-small text-cream font-medium">Raven</h3>
					<p class="text-small text-cream/70 text-xs">She'll take you to the edge.</p>
				</div>
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(174,13,70,0.2)]"></div>
			</div>

			<!-- Ivy -->
			<div class="relative group overflow-hidden rounded-lg aspect-[3/4]">
				<img
					src="/images/gallery/W001-P005-I011.png"
					alt="Ivy"
					class="w-full h-full object-cover transition-all duration-300 group-hover:-translate-y-1"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4">
					<h3 class="text-small text-cream font-medium">Ivy</h3>
					<p class="text-small text-cream/70 text-xs">Sunshine in human form.</p>
				</div>
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(174,13,70,0.2)]"></div>
			</div>

			<!-- Aria -->
			<div class="relative group overflow-hidden rounded-lg aspect-[3/4]">
				<img
					src="/images/gallery/W001-P006-I040.png"
					alt="Aria"
					class="w-full h-full object-cover transition-all duration-300 group-hover:-translate-y-1"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-4">
					<h3 class="text-small text-cream font-medium">Aria</h3>
					<p class="text-small text-cream/70 text-xs">Born to be worshipped.</p>
				</div>
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(174,13,70,0.2)]"></div>
			</div>
		</div>

		<!-- Corner badge -->
		<div class="text-right mt-4">
			<span class="text-tech text-emerald text-sm">50 companions at launch</span>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S9: TRUST BAR
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-16">
	<div class="max-w-5xl mx-auto reveal">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
			<!-- Private -->
			<div class="text-center md:border-r md:border-cream/20 px-4">
				<p class="text-heading text-emerald">Private</p>
				<p class="text-small text-cream/50 mt-2">Your conversations stay yours</p>
			</div>
			<!-- Encrypted -->
			<div class="text-center md:border-r md:border-cream/20 px-4">
				<p class="text-heading text-emerald">Encrypted</p>
				<p class="text-small text-cream/50 mt-2">End-to-end, always</p>
			</div>
			<!-- GDPR -->
			<div class="text-center md:border-r md:border-cream/20 px-4">
				<p class="text-heading text-emerald">GDPR</p>
				<p class="text-small text-cream/50 mt-2">EU-compliant by design</p>
			</div>
			<!-- No Judgment -->
			<div class="text-center px-4">
				<p class="text-heading text-emerald">No Judgment</p>
				<p class="text-small text-cream/50 mt-2">Your fantasy, your rules</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S10: FOUNDING MEMBER
     ═══════════════════════════════════════════════════════════════ -->
<section id="preorder" class="bg-dark px-6 py-32">
	<div class="max-w-lg mx-auto reveal">
		<div class="bg-emerald/[0.08] border border-emerald/30 rounded-xl p-12 text-center">
			<!-- Label -->
			<span class="text-tech text-emerald">★ FOUNDING MEMBER</span>

			<!-- Headline -->
			<h2 class="text-display text-cream mt-4">Be one of the first.</h2>

			<!-- Body -->
			<p class="text-body text-cream/70 mt-4">
				500 founding member spots. When they're gone, they're gone.
				A badge that never expires. Your name in the credits.
				Priority access, day one.
			</p>

			<!-- Perks -->
			<div class="mt-6 space-y-2 text-small text-cream/70">
				<p>✦ Founding member badge -- forever</p>
				<p>✦ Your name in the credits</p>
				<p>✦ Priority access at launch</p>
				<p>✦ Private Discord channel</p>
				<p>✦ Direct input on the roadmap</p>
			</div>

			<!-- CTA -->
			<div class="mt-8">
				<a
					href="#"
					class="relative inline-block px-8 py-4 text-lg bg-emerald text-dark font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-emerald/90 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group"
				>
					<span class="relative z-10">Claim your spot -- $4.99</span>
					<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     S11: FINAL CTA + FOOTER
     ═══════════════════════════════════════════════════════════════ -->
<section class="bg-dark px-6 py-32 relative">
	<!-- Subtle magenta glow -->
	<div class="absolute inset-0 flex justify-center items-center pointer-events-none">
		<div class="w-[300px] h-[300px] bg-magenta/20 rounded-full blur-[120px]"></div>
	</div>

	<div class="max-w-2xl mx-auto text-center relative z-10 reveal">
		<h2 class="text-display text-cream">She already remembers you.</h2>
		<div class="mt-8">
			<a
				href="#preorder"
				class="relative inline-block px-8 py-4 text-lg bg-magenta text-cream font-satoshi font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-magenta/90 hover:shadow-[0_0_30px_rgba(174,13,70,0.3)] group"
			>
				<span class="relative z-10">Pre-order now</span>
				<div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
			</a>
		</div>
		<p class="text-small text-cream/50 mt-4">Plans from $19/mo at launch. Your $4.99 deposit converts to account credit.</p>
	</div>
</section>

<!-- Footer -->
<footer class="bg-dark px-6 border-t border-cream/10 pt-12 pb-8">
	<div class="max-w-7xl mx-auto text-center space-y-6">
		<img src="/images/brand-logo.png" alt="Honeybloom" class="h-10 mx-auto" />
		<div class="flex justify-center gap-8">
			<a href="/homepage" class="text-small text-cream/40 hover:text-cream/70 transition-colors">Home</a>
			<a href="/pricing" class="text-small text-cream/40 hover:text-cream/70 transition-colors">Pricing</a>
			<a href="#" class="text-small text-cream/40 hover:text-cream/70 transition-colors">Privacy</a>
			<a href="#" class="text-small text-cream/40 hover:text-cream/70 transition-colors">Terms</a>
		</div>
		<p class="text-small text-cream/30">© 2026 Honeybloom. All rights reserved.</p>
	</div>
</footer>
