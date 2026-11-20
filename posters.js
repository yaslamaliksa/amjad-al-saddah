// The clickable rectangles use the coordinates of the original menu pages at 800px wide.
export const posterWidth = 800;
export const posterHeight = 1072;

function rows(columns, definitions) {
  return definitions.flatMap(([top, bottom, dishes]) => dishes.map((id, column) => {
    const [left, right] = columns[column];
    return [id, left, top, right, bottom];
  }));
}

export const posters = [
  {
    page: 2, sections: ['chicken'], cards: rows([[557, 758], [305, 504], [50, 250]], [
      [113, 414, ['chicken-mandi', 'chicken-haneeth', 'chicken-madhbi']],
      [428, 731, ['chicken-madghout', 'maqluba', 'rotisserie']],
      [743, 1045, ['charcoal-chicken', 'spicy-chicken', 'aseeda']],
    ]),
  },
  {
    page: 3, sections: ['meat'], cards: [
      ['lamb-mandi', 537, 136, 769, 570],
      ['lamb-haneeth', 284, 136, 516, 570],
      ['red-camel', 34, 135, 265, 479],
      ['white-camel', 537, 597, 769, 1039],
      ['burm', 284, 597, 516, 1039],
      ['peshawar', 34, 501, 265, 758],
      ['rice', 34, 773, 265, 1029],
    ],
  },
  {
    page: 4, sections: ['grills'], cards: rows([[546, 777], [287, 518], [28, 258]], [
      [122, 437, ['mixed-grill', 'lamb-kebab', 'chicken-kebab']],
      [447, 754, ['meat-skewers', 'shish-tawook', 'chicken-sandwich']],
      [758, 1051, ['meat-sandwich', 'tawook-sandwich', 'fries']],
    ]),
  },
  {
    page: 5, sections: ['stews'], cards: rows([[428, 748], [55, 373]], [
      [129, 568, ['okra', 'musaqaa']],
      [591, 1038, ['molokhia', 'oven-mix']],
    ]),
  },
  {
    page: 6, sections: ['dessert'], cards: rows([[545, 763], [290, 510], [36, 258]], [
      [133, 443, ['royal-masoub', 'creme', 'kunafa']],
      [455, 747, ['masoub', 'cream-masoub', 'honey-masoub']],
      [757, 1050, ['marsa', 'areeka', 'royal-areeka']],
    ]),
  },
  {
    page: 7, sections: ['drinks'], cards: rows([[541, 769], [289, 517], [41, 268]], [
      [176, 613, ['almarai', 'water', 'soda']],
      [630, 1055, ['yogurt', 'village-laban', 'almarai-cup']],
    ]),
  },
  {
    page: 8, sections: ['juice'], cards: [
      ['mango', 607, 116, 770, 378],
      ['mango', 221, 173, 580, 579],
      ['orange', 29, 116, 193, 378],
      ['pomegranate', 607, 388, 770, 576],
      ['guava', 29, 388, 193, 576],
      ['melon', 607, 577, 770, 785],
      ['watermelon', 29, 577, 193, 785],
      ['araisi', 221, 603, 580, 1044],
      ['lemon-mint', 607, 798, 770, 1044],
      ['strawberry', 29, 798, 193, 1044],
    ],
  },
  {
    page: 9, sections: ['starters'], cards: rows([[552, 759], [299, 505], [38, 249]], [
      [116, 427, ['tabbouleh', 'moutabal', 'hummus']],
      [433, 742, ['eggplant', 'arugula', 'baba-ghanoush']],
      [748, 1053, ['samosa', 'mixed-mezze', 'olive-salad']],
    ]),
  },
  {
    page: 10, sections: ['salads'], cards: [
      ...rows([[540, 765], [290, 513], [39, 260]], [
        [180, 546, ['green-sauce', 'tahini', 'cucumber-yogurt']],
      ]),
      ['red-sauce', 539, 559, 766, 708],
      ['vegetable-salad', 288, 559, 514, 708],
      ['red-sauce', 40, 555, 262, 714],
      ...rows([[539, 763], [289, 511], [41, 262]], [
        [718, 1042, ['cheese-sahawiq', 'caramel-onion', 'vegetable-salad']],
      ]),
    ],
  },
  {
    page: 11, sections: ['catering'], cards: rows([[546, 778], [286, 516], [30, 261]], [
      [168, 603, ['catering-haneeth', 'catering-mandi', 'catering-kabli']],
      [621, 1053, ['catering-madani', 'catering-kozi', 'catering-haneeth']],
    ]),
  },
  {
    page: 12, sections: ['tea', 'bread'], split: 524, cards: [
      ['tea', 449, 154, 718, 518],
      ['adeni-tea', 90, 154, 359, 518],
      ...rows([[416, 769], [32, 387]], [
        [651, 828, ['malooh', 'malooh-double']],
        [855, 1035, ['sanjal', 'double-ratb']],
      ]),
    ],
  },
  {
    page: 13, sections: ['breakfast'], cards: [
      ...rows([[615, 770], [456, 607], [293, 444]], [
        [145, 424, ['chicken-oqda', 'saltah', 'fahsa']],
        [442, 731, ['foul', 'cheese-beans', 'egg-beans']],
        [750, 1037, ['lahsa', 'adeni-shakshuka', 'shakshuka']],
      ]),
      ['liver', 31, 155, 279, 621],
      ['peas', 31, 649, 281, 1038],
    ],
  },
];

export const posterPath = page => 'assets/original-menu/menu-' + String(page).padStart(2, '0') + '.webp';
