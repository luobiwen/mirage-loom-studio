export type World = {
  slug: string;
  archiveId: string;
  title: string;
  subtitle: string;
  status: string;
  genre: string;
  tone: string;
  accent: string;
  summary: string;
  description: string;
  links: { label: string; href: string }[];
};

export type CodexEntry = {
  slug: string;
  worldSlug: string;
  title: string;
  type: string;
  tag: string;
  summary: string;
  body: string;
};

export type LogBodyBlock =
  | { type: "heading" | "paragraph"; content: string }
  | { type: "list"; items: string[] };

export type LogEntry = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt?: string;
  readingTime: string;
  author: string;
  worldSlug: string;
  body: string | LogBodyBlock[];
  coverImage?: string;
  coverAlt?: string;
};

export type Artifact = {
  slug: string;
  name: string;
  sourceWorld: string;
  status: string;
  price: string;
  description: string;
};

export type Weaver = {
  slug: string;
  name: string;
  title: string;
  image?: string;
  sideImage?: string;
  duties: string[];
  interests: string;
  bio: string;
};

export const announcements = [
  {
    id: "ML-NOTICE-001",
    date: "虚构占位 / 2026.07",
    title: "第一台幻境织机完成网页接线",
    text: "官网第一版开始试运行：织机场景、世界档案、图鉴、日志与收藏柜已经接入同一根发光丝线。",
    important: true
  },
  {
    id: "ML-DEMO-014",
    date: "虚构占位 / 待定",
    title: "《月井车站》Demo 采样中",
    text: "我们正在记录一座会在午夜换轨的车站，以及每位旅客遗落在月光里的愿望。"
  },
  {
    id: "ML-LOG-009",
    date: "虚构占位 / 本周",
    title: "角色袖口为什么需要三层针脚",
    text: "一篇关于小动画、角色性格与制作时间彼此拉扯的织造日志。"
  }
];

export const worlds: World[] = [
  {
    slug: "moonwell-station",
    archiveId: "MIR-001",
    title: "月井车站",
    subtitle: "A platform where wishes change trains",
    status: "织造中",
    genre: "叙事解谜 / 轻探索",
    tone: "月光、列车、旧票据、温柔的谜题",
    accent: "#79c7b4",
    summary: "一座只在月亮倒映进井水时出现的车站，载着迷路的人前往他们没有说出口的愿望。",
    description:
      "玩家将整理车票、修补星轨、与误点的旅客交谈，在每一次发车前决定哪些记忆应该被带走，哪些应该留在站台。演示内容为虚构占位，后续可替换为真实游戏资料。",
    links: [
      { label: "Steam 占位", href: "#" },
      { label: "试玩登记", href: "#join" }
    ]
  },
  {
    slug: "tin-flower-archive",
    archiveId: "MIR-002",
    title: "锡花档案馆",
    subtitle: "A botanical machine keeps dreaming",
    status: "采样中",
    genre: "机关收集 / 世界观探索",
    tone: "黄铜温室、机械植物、手写标本牌",
    accent: "#d49a50",
    summary: "一间被齿轮花朵占领的档案馆，每株植物都保存着一段失落文明的天气。",
    description:
      "玩家将在温室档案架之间收集锡制花瓣、调试灌溉机关，并复原一个以季风和香气书写历史的文明。演示内容为虚构占位。",
    links: [
      { label: "itch.io 占位", href: "#" },
      { label: "开发日志", href: "/logs" }
    ]
  }
];

export const codexEntries: CodexEntry[] = [
  {
    slug: "moonwell-ticket",
    worldSlug: "moonwell-station",
    title: "会改签的月井车票",
    type: "遗物",
    tag: "票据 / 愿望校准",
    summary: "票面目的地会根据持有者当晚最安静的念头改变。",
    body: "研究员备注：车票边缘的银线并非装饰，而是一种极细的记忆导线。演示条目，后续可替换为正式设定。"
  },
  {
    slug: "platform-lantern",
    worldSlug: "moonwell-station",
    title: "十三号站台灯",
    type: "场景",
    tag: "照明 / 轨道标记",
    summary: "当灯芯变成蓝绿色，说明下一班列车会经过梦境浅层。",
    body: "灯罩内侧绘有手工星图，旅客只能看见与自己有关的那一小段。"
  },
  {
    slug: "late-conductor",
    worldSlug: "moonwell-station",
    title: "总是迟到的检票员",
    type: "人物",
    tag: "车站居民",
    summary: "他负责确认每位旅客是否真的准备好离开。",
    body: "口袋里有三十七块停摆的怀表，每块都指向一次没能说出口的道别。"
  },
  {
    slug: "tin-bloom",
    worldSlug: "tin-flower-archive",
    title: "锡花",
    type: "生物",
    tag: "机械植物",
    summary: "花瓣是薄锡片，叶脉中流动着低温墨水。",
    body: "锡花在听见雨声时会展开旧文明的索引编号。演示条目，后续可替换。"
  },
  {
    slug: "weather-drawer",
    worldSlug: "tin-flower-archive",
    title: "天气抽屉",
    type: "科技",
    tag: "档案装置",
    summary: "打开不同抽屉，会闻到不同年代的风。",
    body: "每个抽屉底部都有织机针脚般的黄铜轨道，用来固定天气样本。"
  },
  {
    slug: "greenhouse-map",
    worldSlug: "tin-flower-archive",
    title: "温室根系地图",
    type: "文明",
    tag: "地图 / 农艺史",
    summary: "这张地图不是画出来的，而是由植物根系慢慢长成。",
    body: "它记录了档案馆的迁徙，也记录了哪些房间曾经被季风遗忘。"
  }
];

export const logs: LogEntry[] = [
  {
    slug: "website-woven-at-last",
    title: "官网织成之日",
    date: "2026-07-18",
    category: "网站设计",
    excerpt:
      "幻境织机官网第一版正式完成。记录魔法工坊视觉风格、数据驱动的网站结构，以及首页整屏滚动体验的设计过程。",
    readingTime: "3 分钟",
    author: "bb",
    worldSlug: "",
    coverImage: "/art/magical-loom/website-woven-at-last.webp",
    coverAlt: "魔法工坊中的幻境织机正在织出一幅发光的紫色织布",
    body: [
      { type: "paragraph", content: "✨ 幻境织机的官方网站第一版，终于正式完成了。" },
      { type: "paragraph", content: "幻境织机是一座真实存在的魔法工坊：巨大的机械织机在房间中央运转，黄铜、祖母绿珐琅、水晶和旧羊皮纸共同构成了网站的视觉语言。" },
      { type: "paragraph", content: "我们的网站有：" },
      { type: "list", items: ["🧵 梦幻的织机场景与动画", "📚 幻境档案、图鉴与日志", "🗝️ 完整的工作室网站功能架构"] },
      { type: "heading", content: "🏛️ 一座可以进入的魔法工坊" },
      { type: "paragraph", content: "首页承担的是“第一次推开工坊大门”的体验，因此使用了完整的场景插画和分层动画；幻境档案像被收藏起来的研究资料；织造日志则采用规整、朴素的纸质档案排版。不同栏目拥有自己的功能，但仍然共享同一套颜色、边框、字体与材料语言。" },
      { type: "heading", content: "🧵 用数据继续编织内容" },
      { type: "paragraph", content: "在结构上，网站使用 Next.js 搭建。首页、幻境档案、图鉴、日志、收藏和织造师被拆分成不同页面，常用的 Logo、标题和场景则由独立组件负责。" },
      { type: "paragraph", content: "首页织机、角色和其他页面素材彼此分开，使网站在继续扩展时更好整理。" },
      { type: "heading", content: "🪄 把整座工坊推向下一页" },
      { type: "paragraph", content: "首页的滚动方式也经历了一次重新设计。" },
      { type: "paragraph", content: "进入网站时，Hero 首屏会暂时固定在窗口中。随着滚轮向下移动，整幅工坊场景、Logo、标题和短句一起向上离开屏幕，位于下方的公告区随后自然接入。" },
      { type: "paragraph", content: "整个过程像在手机上面滑动屏幕。" },
      { type: "paragraph", content: "这样既保留了大型主视觉的沉浸感，也让用户能够顺畅进入网站真正的内容区域。" },
      { type: "heading", content: "✨ 第一根丝线" },
      { type: "paragraph", content: "网站第一版完成，并不意味着织造结束。" },
      { type: "paragraph", content: "它只是为未来的幻境、角色、开发记录和作品，搭好了一台可以继续运转的织机。" },
      { type: "paragraph", content: "第一根发光的丝线，已经穿过去了。" }
    ]
  },
  {
    slug: "cloak-motion",
    title: "斗篷边缘不需要很大动作",
    date: "2026-07-14",
    category: "动画制作",
    excerpt: "角色越忙碌，动画越要克制。细小呼吸比夸张摆动更像深夜工作的人。",
    readingTime: "3 分钟",
    author: "织造记录员",
    worldSlug: "moonwell-station",
    body: "占位日志：后续可以替换为角色拆层、骨骼绑定或 CSS 动画经验。"
  },
  {
    slug: "archive-cards",
    title: "我们想让游戏卡片像样本册",
    date: "2026-07-09",
    category: "界面设计",
    excerpt: "不是冷冰冰的产品列表，而是一张张被带回实验室、仍然带着异世界气味的档案。",
    readingTime: "5 分钟",
    author: "联合织造师",
    worldSlug: "tin-flower-archive",
    body: "占位日志：适合记录 UI 设计取舍、颜色系统和信息架构。"
  },
  {
    slug: "failed-potion",
    title: "一次失败的药剂瓶气泡实验",
    date: "2026-07-02",
    category: "失败方案",
    excerpt: "气泡太多时，实验室看起来像饮料广告。我们删掉了大半，只留下偶尔冒出的几个。",
    readingTime: "2 分钟",
    author: "幻境织造师",
    worldSlug: "tin-flower-archive",
    body: "占位日志：失败方案同样值得记录，它们会让作品更真实。"
  }
];

export const artifacts: Artifact[] = [
  {
    slug: "moonwell-ticket-pin",
    name: "月井车票金属徽章",
    sourceWorld: "月井车站",
    status: "收藏室准备中",
    price: "价格占位",
    description: "一枚像被月光打孔的车票徽章。虚构占位商品。"
  },
  {
    slug: "tin-flower-acrylic",
    name: "锡花透明亚克力",
    sourceWorld: "锡花档案馆",
    status: "设计采样",
    price: "价格占位",
    description: "机械花瓣与温室标签叠印的桌面小物。虚构占位商品。"
  },
  {
    slug: "loom-sketchbook",
    name: "幻境织机草图册",
    sourceWorld: "Mirage Loom",
    status: "暂未开放",
    price: "价格占位",
    description: "收录织机设定、图层拆解和失败草图的纸本。虚构占位商品。"
  },
  {
    slug: "thread-music",
    name: "发光丝线音乐集",
    sourceWorld: "全工作室",
    status: "曲目整理中",
    price: "价格占位",
    description: "给深夜工坊、车站月台和黄铜温室写的短曲。虚构占位商品。"
  }
];

export const weavers: Weaver[] = [
  {
    slug: "first-weaver-a",
    name: "qiqi",
    title: "首席织造师 / 联合织造师",
    image: "/art/weavers/qiqi.webp",
    duties: ["世界观采样", "叙事设计", "角色与场景概念"],
    interests: "喜欢旧车票、植物标本、会发光的注释线。",
    bio: "秦婉舒，2026 年毕业于中山大学计算机学院。幻境织机首席织造师，温柔有趣又拥有强大的魔法力量，擅长把一点点奇怪的念头整理成可以进入的世界。"
  },
  {
    slug: "first-weaver-b",
    name: "bb",
    title: "创始织造师",
    image: "/art/weavers/bb.webp",
    sideImage: "/art/weavers/bbq-cutout-v2.webp",
    duties: [],
    interests: "喜欢把遥远、模糊、神秘的幻境整理成可以被触碰的真实作品。",
    bio: "罗碧文，2026 年毕业于中山大学软件工程学院。幻境织机的创造者，一个神秘高冷的魔法师，擅长幻境织造，程序织造，魔法系统调试。"
  }
];

export function getWorld(slug: string) {
  return worlds.find((world) => world.slug === slug);
}

export function getCodex(slug: string) {
  return codexEntries.find((entry) => entry.slug === slug);
}

export function getLog(slug: string) {
  return logs.find((entry) => entry.slug === slug);
}
