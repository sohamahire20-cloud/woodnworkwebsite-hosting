const chapters = [
  {
    image: 'island',
    paragraphs: [
      'At WOOD N WORK, we believe that every space deserves thoughtful design, exceptional craftsmanship and attention to detail.',
      'Built on a legacy of over <strong>35 years of experience in the plywood, laminates, hardware and interior raw materials industry</strong>, we bring generations of material knowledge, industry understanding and customer trust into the world of modular interiors.',
      'Our journey began with a deep understanding of the materials that shape beautiful spaces. Today, we are taking that legacy forward through WOOD N WORK – a new-age modular solutions brand dedicated to designing and creating thoughtfully crafted interiors.'
    ]
  },
  {
    image: 'walk-in',
    paragraphs: [
      'From elegant modular kitchens and sophisticated wardrobes to bespoke furniture and complete interior solutions, we combine contemporary aesthetics, intelligent functionality and quality materials to create spaces that reflect your lifestyle.',
      'We believe great interiors are not just about how a space looks, but also about how it feels, functions and lasts. Every project is approached with precision, personalised attention and a commitment to delivering quality beyond expectations.'
    ]
  },
  {
    image: 'modular',
    paragraphs: [
      '<strong>Our experience is our foundation. Design is our passion. Craftsmanship is our promise.</strong>',
      'At WOOD N WORK, we don’t just make furniture. We create spaces designed around the way you live.',
      '<strong>WOOD N WORK – Modular Solutions.</strong><br><em>Designed with Purpose. Crafted with Precision.</em>'
    ]
  }
];

export function brandStory(){
  return `<section class="brand-story" id="brand-story" aria-labelledby="brand-story-title">
    <div class="wrap">
      <div class="brand-story-heading centered">
        <p class="eyebrow">ABOUT WOOD N WORK</p>
        <h2 id="brand-story-title">Crafting Spaces. <em>Creating Experiences.</em></h2>
      </div>
      <div class="brand-story-layout">
        <div class="brand-story-visual" aria-hidden="true">
          ${chapters.map(({image}, index) => `<img src="/images/products/${image}.webp" alt="" loading="lazy"${index === 0 ? ' class="is-current"' : ''}>`).join('')}
        </div>
        <div class="brand-story-reading">
          ${chapters.map(({paragraphs}) => `<div class="brand-story-chapter">${paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}</div>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}
