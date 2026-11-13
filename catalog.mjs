export const productGroups = [
  { id: 'kitchens', title: 'Kitchens', requirement: 'Kitchen', items: [
    ['island', 'Island Kitchen', 'A freestanding island adds a central surface for prep and gathering.'],
    ['peninsula', 'Peninsula Kitchen', 'An attached counter extends the work area without needing space around all four sides.'],
    ['u-shape', 'U Shape Kitchen', 'Cabinetry and worktops wrap around three sides.'],
    ['l-shape', 'L Shape Kitchen', 'Two adjoining walls give the kitchen a defined corner while leaving the room open.'],
    ['parallel', 'Parallel Kitchen', 'Two facing runs keep prep, cooking and storage within easy reach.'],
    ['single-wall', 'Single Wall Kitchen', 'Cooking, prep and storage sit along one wall.'],
    ['coffee-bar', 'Coffee N Bar', 'A dedicated cabinet and counter for coffee, drinks and glassware.']
  ] },
  { id: 'wardrobes', title: 'Wardrobes', requirement: 'Wardrobe', items: [
    ['designer', 'Designer Wardrobe', 'Decorative fronts make everyday storage a feature of the room.'],
    ['swing', 'Swing Wardrobe', 'Hinged doors open outward for direct access to each section.'],
    ['sliding', 'Sliding Wardrobe', 'Sliding panels leave the space in front clear of a door swing.'],
    ['walk-in', 'Walk In Wardrobe', 'A separate dressing area puts hanging space and shelving within easy reach.']
  ] },
  { id: 'doors', title: 'Doors', requirement: 'Door', items: [
    ['entrance', 'Entrance Doors', 'Explore panel details and finishes for the first thing guests see.'],
    ['bedroom', 'Bedroom Doors', 'Choose a finish that fits the bedroom and the adjoining space.']
  ] },
  { id: 'beds', title: 'Beds', requirement: 'Bed', items: [
    ['luxury', 'Luxury Bed', 'An upholstered headboard and frame give the bed a softer profile.'],
    ['modular', 'Modular Bed', 'A low platform with a headboard and coordinated bedside furniture.'],
    ['kids', 'Kids Bedroom', 'A bed paired with shelves and a desk for everyday routines.']
  ] },
  { id: 'office-furniture', title: 'Office Furniture', requirement: 'Office Furniture', items: [
    ['ceo-cabin', 'Office CEO Cabin', 'An executive desk paired with display shelves and storage.'],
    ['office', 'Office Furniture', 'Shared workstations with desk dividers for team seating.']
  ] }
];

export const enquiryRequirements = [...productGroups.map(group => group.requirement), 'Other Custom Furniture'];
export const materialOptions = [
  'BWR/BWP Plywood', 'HMDR', 'Premium Hardware', 'Premium Laminate', 'Acrylic',
  'P.U. Painted Shutters / Doors', 'Membrane Shutters / Doors'
];
