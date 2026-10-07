// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏功能
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    navbarToggle.addEventListener('click', function() {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // 关闭移动端菜单
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });

    // 比赛经历旗舰展示：突破框架的机器人抠图 + 佐证证书墙
    function buildBipedShowcase(project) {
        const wrap = document.createElement('div');
        wrap.className = 'biped-showcase';

        const certs = [
            { name: '"挑战杯"中国青年科技创新"揭榜挂帅"擂台赛 三等奖（2026 · 团队位次2）', img: 'assets/competition_certifications/jiebang_guaishuai_national_3rd_2026.png', short: '"挑战杯"揭榜挂帅擂台赛 · 全国三等奖（2026·团队位次第2）' },
            { name: '"西门子杯"中国智能制造挑战赛 华东一赛区一等奖 · 队长（2025）', img: 'assets/competition_certifications/siemens_cup_east_china_1st_2025.png', short: '"西门子杯"智能制造挑战赛 · 华东一等奖（队长·2025）' },
            { name: '全国大学生节能减排社会实践与科技竞赛 全国二等奖——智能双足巡检拾取机器人（2025·队长）', img: 'assets/competition_certifications/energy_saving_national_2nd_biped_2025.jpg', short: '节能减排科技竞赛 · 全国二等奖（队长·2025）' },
            { name: '第十九届iCAN大学生创新创业大赛 上海赛区一等奖 · 队长（2025）', img: 'assets/competition_certifications/ican_shanghai_1st_2025.jpg', short: 'iCAN创新创业大赛 · 上海一等奖（队长·2025）' }
        ];

        wrap.innerHTML = `
            <div class="bp-head">
                <span class="bp-kicker">比赛经历 · 旗舰项目</span>
                <h3 class="bp-title">${project.title}</h3>
                <p class="bp-tagline">有眼、有手、有脚、有脑 —— 面向园区巡检拾取的具身智能双足轮足机器人</p>
            </div>
            <figure class="bp-video">
                <div class="bp-video-cover" role="button" aria-label="播放原型机运行画面">
                    <img src="assets/videos/biped_finals_demo_poster.jpg" alt="原型机运行画面" loading="lazy">
                    <span class="bp-video-playbtn" aria-hidden="true"></span>
                </div>
                <figcaption>原型机运行画面</figcaption>
            </figure>
            <div class="bp-body">
                <div class="bp-text">
                    <p>担任<b>队长</b>（申报书第一申报人），主导总体方案与系统集成。自研 YOLOv8 改进模型经两年迭代，四大类垃圾综合识别率从 23% 提升至 85%，支持 200+ 类校园垃圾与障碍物识别；融合 2D/3D 激光雷达、IMU、GPS 与视觉的多传感器 SLAM（EKF + G2O + 回环检测），2D 栅格与 3D 稠密点云建图；A* 全局规划 + DWA 动态避障；六舵机机械臂配合双目相机精准夹取；四连杆轮足在草地、碎石等非结构化地形稳定行走；Jetson Orin Nano + STM32 上下位机架构。基于本项目斩获<b>“挑战杯”揭榜挂帅擂台赛全国三等奖、全国节能减排竞赛二等奖、iCAN 上海赛区一等奖、西门子杯智能制造挑战赛华东赛区一等奖、汇创青春上海市一等奖</b>等多项荣誉。</p>
                    <div class="bp-chips">
                        <span>YOLOv8 · 识别率 23%→85%</span>
                        <span>200+ 类垃圾与障碍物</span>
                        <span>多传感器融合 SLAM</span>
                        <span>A*+DWA · 冗余路径 -33.38%</span>
                        <span>四连杆轮足 · 越野行走</span>
                        <span>Jetson Orin + STM32</span>
                    </div>
                </div>
                <div class="bp-stage">
                    <div class="bp-photos">
                        <figure class="bp-photo bp-p1"><img src="assets/project_biped/biped_real_front_studio.jpg" alt="原型机正视实拍"><figcaption>原型机 · 正视实拍</figcaption></figure>
                        <figure class="bp-photo bp-p2"><img src="assets/project_biped/biped_real_arm_photo.jpg" alt="原型机机械臂展开实拍"><figcaption>原型机 · 机械臂展开实拍</figcaption></figure>
                    </div>
                </div>
            </div>
            <div class="bp-certs">
                <div class="bp-cert-row">
                    ${certs.map((c, i) => `
                        <figure class="bp-cert" data-i="${i}">
                            <img src="${c.img}" alt="${c.short}">
                            <figcaption>${c.short}</figcaption>
                        </figure>`).join('')}
                </div>
            </div>
        `;

        // 原型机运行画面：点击封面 → Canvas 画布播放
        // （夸克/UC 等内核会把播放中的 <video> 抽成悬浮窗，canvas 不受影响）
        const bpCover = wrap.querySelector(".bp-video-cover");
        if (bpCover) {
            bpCover.addEventListener("click", () => {
                // 夸克/UC 内核会把播放中的视频强行抽成悬浮窗且无关闭键——
                // 这类浏览器改为新页面打开视频文件，使用其自带的视频播放页
                if (/quark|ucbrowser|ucweb|uclist/i.test(navigator.userAgent)) {
                    window.open("assets/videos/biped_finals_demo.mp4", "_blank");
                    return;
                }
                const holder = document.createElement("div");
                holder.className = "bp-video-player";
                holder.innerHTML = '<video playsinline webkit-playsinline x5-playsinline x5-video-player-type="h5-page" src="assets/videos/biped_finals_demo.mp4"></video><canvas></canvas><span class="bp-video-state"></span>';
                bpCover.replaceWith(holder);
                const v = holder.querySelector("video");
                const cv = holder.querySelector("canvas");
                const state = holder.querySelector(".bp-video-state");
                const cx = cv.getContext("2d");

                const sync = () => {
                    cv.width = v.videoWidth || 1280;
                    cv.height = v.videoHeight || 720;
                    if (v.videoWidth) cx.drawImage(v, 0, 0, cv.width, cv.height);
                    state.textContent = v.paused ? "▶" : "";
                };
                v.addEventListener("loadedmetadata", sync);
                v.addEventListener("seeked", sync);
                v.addEventListener("play", () => { state.textContent = ""; loop(); });
                v.addEventListener("pause", () => { sync(); state.textContent = "▶"; });

                let rafId = null;
                const loop = () => {
                    if (v.paused || v.ended || !holder.isConnected) { rafId = null; return; }
                    cx.drawImage(v, 0, 0, cv.width, cv.height);
                    rafId = requestAnimationFrame(loop);
                };

                cv.addEventListener("click", () => v.paused ? v.play().catch(() => {}) : v.pause());

                v.play().catch(() => { sync(); state.textContent = "▶"; });
            });
        }

        // 证书点击 → 灯箱放大（复用全局灯箱）
        wrap.querySelectorAll('.bp-cert').forEach(fig => {
            fig.addEventListener('click', () => {
                const i = parseInt(fig.dataset.i, 10);
                openLightbox(certs[i].img, certs[i].name, i, certs);
            });
        });

        // 实拍照片：点击灯箱 + 滚动进入视野时错峰入场动画
        const photoWrap = wrap.querySelector('.bp-photos');
        const photos = Array.from(wrap.querySelectorAll('.bp-photo'));
        const photoList = photos.map(p => ({
            img: p.querySelector('img').getAttribute('src'),
            name: p.querySelector('figcaption').textContent
        }));
        photos.forEach((p, i) => {
            p.addEventListener('click', () => openLightbox(photoList[i].img, photoList[i].name, i, photoList));
        });
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(entries => {
                if (entries.some(en => en.isIntersecting)) {
                    photos.forEach((p, i) => setTimeout(() => p.classList.add('bp-in'), 170 * i));
                    io.disconnect();
                }
            }, { threshold: 0.3 });
            io.observe(photoWrap);
            // 兜底：无论如何 4 秒后必定显示
            setTimeout(() => photos.forEach(p => p.classList.add('bp-in')), 4000);
        } else {
            photos.forEach(p => p.classList.add('bp-in'));
        }

        return wrap;
    }

    // 渲染项目卡片
    function renderProjects() {
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';
        
        // 项目数据（严格按简历逻辑：论文发表=研究方向说明块在前、该方向论文在后 → 工作经历=实习一/二 → 比赛经历；与 data.json 保持一致）
        const projects = [
            {
                id: 1,
                group: '论文发表',
                type: 'direction',
                title: '研究方向一 · 多智能体强化学习与具身协同决策',
                description: '聚焦多无人艇（Multi-USV）等具身智能体在对抗博弈与协同任务中的自主决策问题：以图注意力网络（GAT）与 Transformer 构建时空推理骨干，采用"集中训练、分散执行"（CTDE）范式，结合元强化学习与课程学习，应对通信受限、传感器异构、对手自适应等真实海洋环境挑战。'
            },
            {
                id: 2,
                group: '论文发表',
                reverse: false,
                title: '第一作者论文 · 多USV对抗博弈的时空元强化学习',
                venue: 'Journal of Marine Science and Engineering · SCI 收录 · JCR Q2 · IF 2.8',
                description: '论文题目《Spatiotemporal Meta-Reinforcement Learning for Multi-USV Adversarial Games Using a Hybrid GAT-Transformer》。提出Adv-TransAC时空元强化学习框架：GAT-Transformer+CTDE架构与动态多模态注意力融合，实现空间建模、时序推理与异构传感器融合；引入对抗元学习与课程学习，对抗成功率78.5%，通信带宽降低约70%，单步推理18.6ms。',
                gallery: [
                    { img: 'assets/research_paper_figs/jmse_advtransac_framework.png', caption: 'Figure 2 · 研究方法总框架', name: '论文配图 Figure 2 · Adv-TransAC 研究方法总框架（JMSE 2025，第一作者）', span: 2 },
                    { img: 'assets/research_paper_figs/jmse_meta_learning_architecture.png', caption: 'Figure 3 · 对抗元学习架构', name: '论文配图 Figure 3 · 对抗元学习架构：对手编码器 + GNN-Transformer 基座策略 + 元调节器与课程学习调度' },
                    { img: 'assets/research_paper_figs/jmse_multimodal_fusion_pipeline.png', caption: 'Figure 4 · 动态多模态融合管线', name: '论文配图 Figure 4 · 动态多模态融合管线：雷达点云 / 占据栅格 / 威胁热图时空对齐与融合' },
                    { img: 'assets/research_paper_certification/paper_jmse_multi_usv_meta_rl_2025.png', caption: '出版证书 · 第一作者', name: 'Spatiotemporal Meta-RL for Multi-USV Adversarial Games（JMSE 2025，第一作者）出版证书', span: 2 }
                ],
                link: '#',
                tags: ['第一作者', '多智能体强化学习', 'GAT', 'Transformer', 'CTDE', 'PyTorch']
            },
            {
                id: 3,
                group: '论文发表',
                type: 'direction',
                title: '研究方向二 · 具身视觉感知与边缘部署',
                description: '面向果园、珊瑚礁等真实场景，研究轻量化目标检测与智能光学感知：让模型在遮挡、光照退化、小目标等困难条件下保持稳定的识别与预测，并落地到 Jetson 等边缘设备实时推理，服务智慧农业与海洋栖息地监测等具身应用。以下两篇姊妹篇共同构成该方向的技术栈。'
            },
            {
                id: 4,
                group: '论文发表',
                reverse: true,
                title: 'Orchard-YOLO：复杂光学环境下的果园果实检测',
                venue: 'Photonics · SCI 收录 · JCR Q2',
                description: '论文正式题目（以期刊证书为准）《Orchard-YOLO: A Robust Deep Learning Framework for Fruit Detection under Complex Optical and Environmental Degradation》。参与轻量化检测网络研发与边缘部署：Ghost 卷积骨干 + CA 增强特征融合 + P2 高分辨率检测头，实现遮挡与光照鲁棒识别及 Jetson 边缘设备实时推理。',
                gallery: [
                    { img: 'assets/research_paper_figs/orchardyolo_architecture.png', caption: 'Figure 2 · Orchard-YOLO 整体架构', name: '论文配图 Figure 2 · Orchard-YOLO 整体架构：Ghost 卷积骨干 + CA 增强特征融合 + P2 高分辨率检测头（Photonics 2026）', span: 2 },
                    { img: 'assets/research_paper_figs/orchardyolo_occlusion_results.jpg', caption: 'Figure 8 · 遮挡递增检测成果', name: '论文配图 Figure 8 · 清洁 / 30% / 70% 遮挡下检测成果对比：重度遮挡下 YOLOv13 仍保持更多果实定位' },
                    { img: 'assets/research_paper_figs/orchardyolo_robustness.png', caption: 'Figure 11 · 鲁棒性得分对比', name: '论文配图 Figure 11 · 遮挡/光照/尺度/复合应力下的鲁棒性得分对比（YOLOv13 相对 YOLOv8 全面占优）' },
                    { img: 'assets/research_paper_certification/paper_photonics_orchard_yolo_2026.jpg', caption: '出版证书', name: 'Orchard-YOLO（Photonics 2026）出版证书', span: 2 }
                ],
                link: '#',
                tags: ['YOLO', '轻量化', 'Jetson', '边缘部署', 'Photonics']
            },
            {
                id: 5,
                group: '论文发表',
                reverse: false,
                title: 'Coral-YOLO：面向珊瑚礁海洋监测的智能光学感知',
                venue: 'Sensors · SCI 收录 · JCR Q2',
                description: '参与智能光学视觉感知框架中检测与预测部分的实现：局部-全局注意力（LGA）单元与时序预测模块，提升小目标、遮挡与跨域场景下的检测稳定性及时序预测能力，用于高保真海洋栖息地监测与预报。',
                gallery: [
                    { img: 'assets/research_paper_figs/coralyolo_architecture.png', caption: 'Figure 1 · Coral-YOLO 整体架构', name: '论文配图 Figure 1 · Coral-YOLO 整体架构：时序图像输入、多项创新的检测框架（Sensors 2025）' },
                    { img: 'assets/research_paper_figs/coralyolo_training_dynamics.png', caption: 'Figure 7 · 训练过程', name: '论文配图 Figure 7 · CR-Mix 验证集训练过程：Coral-YOLO 的 mAP 收敛速度与精度显著高于基线' },
                    { img: 'assets/research_paper_figs/coralyolo_detection_compare.jpg', caption: 'Figure 9 · 检测与预测成果', name: '论文配图 Figure 9 · 真实珊瑚礁场景检测与预测成果对比（Coral-YOLO vs 基线）', span: 2 },
                    { img: 'assets/research_paper_figs/coralyolo_heatmap.jpg', caption: 'Figure 10 · Grad-CAM 热力图', name: '论文配图 Figure 10 · Grad-CAM 诊断：Coral-YOLO 的注意力更聚焦珊瑚目标区域', span: 2 },
                    { img: 'assets/research_paper_certification/paper_sensors_coral_yolo_2025.jpg', caption: '出版证书', name: 'Coral-YOLO（Sensors 2025）出版证书' }
                ],
                link: '#',
                tags: ['YOLO', '目标检测', '时序预测', '海洋感知', 'Sensors']
            },
            {
                id: 6,
                group: '工作经历',
                title: '实习一：智能决策与Agent算法研发（广西柳药集团 · A股603368 · 2026.07-2026.09）',
                description: '实习项目：基于CV/OCR+文本多模态，实现界面动作、时序日志与源表字段的高精度关联与行为序列对齐；参与设计基于示范学习（LfD）的GUI自动化Agent方案、自动化脚本与查询映射模块；参与数据脱敏与数据字典标准化，构建覆盖边界条件的鲁棒性测试集。',
                image: 'assets/internship_certificate/liuyao_internship_certificate_cn.jpg',
                link: '#',
                enCert: { img: 'assets/internship_certificate/liuyao_internship_certificate_en.jpg', name: '实习证明（英文版）—— 广西柳药集团 Internship Certificate (EN)' },
                tags: ['多模态', 'OCR', 'LfD', 'GUI Agent', '数据治理']
            },
            {
                id: 7,
                group: '工作经历',
                title: '实习二：机器人视觉检测（乾锦智能 · 上汽通用五菱产线 · 2026.01-2026.04）',
                description: '实习项目：涂胶检测采用YOLO系列2D视觉检测，实现胶条有无、长宽度、断胶、偏移等缺陷快速识别；焊点检测采用线结构光三维测量+CV算法，实现焊点余高、咬边、错边高精度测量与表面缺陷识别；参与多传感器融合与智能决策模块开发。系统已部署于上汽通用五菱自动化生产线并稳定运行。',
                image: 'assets/internship_certificate/qianjin_internship_certificate_cn.jpg',
                link: '#',
                enCert: { img: 'assets/internship_certificate/qianjin_internship_certificate_en.jpg', name: '实习证明（英文版）—— 柳州乾锦智能装备 Internship Certificate (EN)' },
                tags: ['YOLO', '线结构光3D测量', 'OpenCV', '缺陷检测']
            },
            {
                id: 8,
                group: '比赛经历',
                title: '智能巡检拾取多模态双足机器人（智巡清道 · 队长）',
                description: '担任队长（申报书第一申报人），主导总体方案与系统集成，构建"有眼、有手、有脚、有脑"的具身智能巡逻拾取系统：自研YOLOv8改进模型经两年迭代，四大类垃圾综合识别率从23%提升至85%，支持200+类校园垃圾与障碍物识别（红外运动相机保证日夜作业）；融合思岚S2L二维激光雷达、宇树L2三维激光雷达、IMU、GPS与视觉的多传感器SLAM（EKF联合优化前端 + G2O图优化 + 回环检测后端），支持2D栅格与3D稠密点云建图及区域语义标签；分层路径规划采用A*全局规划+DWA局部动态避障，冗余路径减少33.38%，整体作业效率提升12.4%；后置六舵机机械臂配合双目相机实现精准夹取与分类投放，四连杆轮足结构结合IMU姿态反馈与PD平衡控制，在草地、碎石等非结构化地形稳定行走；上层Jetson Orin Nano + 下层STM32上下位机架构，配套移动端可视化管理平台。基于本项目已发表SCI二区论文3篇、IEEE论文1篇，另有多篇在投。获"挑战杯"揭榜挂帅擂台赛全国三等奖（智慧环卫国产系统无人清扫车关键技术攻关·学生赛道·团队位次第2）、节能减排竞赛全国二等奖、iCAN上海赛区一等奖、西门子杯华东赛区一等奖、汇创青春上海市一等奖等。',
                image: 'assets/project_biped/biped_project_cover.jpg',
                link: '#',
                tags: ['YOLOv8', 'SLAM', 'A*+DWA', '机械臂', 'Jetson Orin', '双足轮足']
            }
        ];
        
        // 按简历逻辑分组渲染：组变化时插入分组标题
        let currentGroup = '';
        projects.forEach(project => {
            if (project.group && project.group !== currentGroup) {
                currentGroup = project.group;
                const groupTitle = document.createElement('h3');
                groupTitle.className = 'project-group-title';
                groupTitle.textContent = project.group;
                projectsContainer.appendChild(groupTitle);
            }
            const projectCard = document.createElement('div');

            // 研究方向说明块：先讲方向，再展示该方向的论文
            if (project.type === 'direction') {
                const dirIntro = document.createElement('div');
                dirIntro.className = 'direction-intro';
                dirIntro.innerHTML = `
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                `;
                projectsContainer.appendChild(dirIntro);
                return;
            }

            // 比赛经历：旗舰展示区块（突破框架排版 + 证书佐证墙）
            if (project.group === '比赛经历') {
                projectsContainer.appendChild(buildBipedShowcase(project));
                return;
            }

            projectCard.className = 'project-card';
            const gallery = project.gallery || [];
            if (gallery.length) {
                // 论文卡：全宽杂志面板——上部左文右图（reverse 时交错），证书作为整块面板的压轴大图横贯底部居中
                const certItem = gallery.find(g => /证书/.test(g.caption)) || null;
                const figs = gallery.filter(g => g !== certItem);
                const panel = document.createElement('article');
                panel.className = 'paper-panel' + (project.reverse ? ' reverse' : '');
                panel.innerHTML = `
                    <div class="pp-main">
                        <div class="pp-text">
                            <h3 class="pp-title">${project.title}</h3>
                            ${project.venue ? `<p class="pp-venue">${project.venue}</p>` : ''}
                            <p class="pp-desc">${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                            ${project.enCert ? `<button class="project-en-btn" data-img="${project.enCert.img}" data-name="${project.enCert.name}">🌐 查看英文版证明 English</button>` : ''}
                        </div>
                        <div class="pp-mosaic">
                            ${figs.map((g, i) => `<figure class="pp-item${g.span === 2 ? ' span2' : ''}" data-i="${gallery.indexOf(g)}">
                                <div class="pgi-frame"><img src="${g.img}" alt="${g.caption}"></div>
                                <figcaption>${g.caption}</figcaption>
                            </figure>`).join('')}
                        </div>
                    </div>
                    ${certItem ? `<figure class="pp-item cert pp-cert" data-i="${gallery.indexOf(certItem)}">
                        <div class="pgi-frame"><img src="${certItem.img}" alt="${certItem.caption}"></div>
                        <figcaption>${certItem.caption}</figcaption>
                    </figure>` : ''}
                `;
                const lbList = gallery.map(g => ({ img: g.img, name: g.name }));
                panel.querySelectorAll('.pp-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const i = parseInt(item.dataset.i, 10);
                        openLightbox(lbList[i].img, lbList[i].name, i, lbList);
                    });
                });
                const enBtn = panel.querySelector('.project-en-btn');
                if (enBtn) enBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightbox(project.enCert.img, project.enCert.name, 0, [project.enCert]);
                });
                projectsContainer.appendChild(panel);
                return;
            }
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span>📁</span>'">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    ${project.enCert ? `<button class="project-en-btn" data-img="${project.enCert.img}" data-name="${project.enCert.name}">🌐 查看英文版证明 English</button>` : ''}
                </div>
            `;
            projectsContainer.appendChild(projectCard);
            const enBtn = projectCard.querySelector('.project-en-btn');
            if (enBtn) enBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(project.enCert.img, project.enCert.name, 0, [project.enCert]);
            });
        });
    }

    // 渲染证书
    function renderCertifications() {
        const categoriesContainer = document.getElementById('certifications-categories');
        const gridContainer = document.getElementById('certifications-grid');
        
        if (!categoriesContainer || !gridContainer) return;

        // 证书数据（与 data.json 保持一致；推荐信为PDF无法以图片展示，未列入）
        const certifications = [
            { category: 'competition certifications', name: '全国大学生数学建模竞赛 上海市二等奖 · 队长（2025）', img: 'assets/competition_certifications/cumcm_shanghai_2nd_2025.jpg' },
            { category: 'competition certifications', name: '第十九届iCAN大学生创新创业大赛 上海赛区一等奖 · 队长（2025）', img: 'assets/competition_certifications/ican_shanghai_1st_2025.jpg' },
            { category: 'competition certifications', name: '"西门子杯"中国智能制造挑战赛 华东一赛区一等奖 · 队长（2025）', img: 'assets/competition_certifications/siemens_cup_east_china_1st_2025.png' },
            { category: 'competition certifications', name: '"挑战杯"中国青年科技创新"揭榜挂帅"擂台赛 三等奖——智慧环卫国产系统无人清扫车关键技术攻关（学生赛道·团队位次2·初审通过）', img: 'assets/competition_certifications/jiebang_guaishuai_national_3rd_2026.png' },
            { category: 'competition certifications', name: '全国大学生节能减排社会实践与科技竞赛 全国二等奖——智能双足巡检拾取机器人（2025·队长）', img: 'assets/competition_certifications/energy_saving_national_2nd_biped_2025.jpg' },
            { category: 'competition certifications', name: '全国大学生节能减排社会实践与科技竞赛 全国二等奖——智冷绿运生鲜冷链箱 · 队员（2025）', img: 'assets/competition_certifications/energy_saving_national_2nd_coldchain_2025.jpg' },
            { category: 'competition certifications', name: '第二届上海市大学生节能减排竞赛 二等奖——智能双足巡检拾取机器人 · 队长（2025）', img: 'assets/competition_certifications/energy_saving_shanghai_2nd_biped_2025.jpg' },
            { category: 'competition certifications', name: '第二届上海市大学生节能减排竞赛 二等奖——智冷绿运生鲜冷链箱 · 队员（2025）', img: 'assets/competition_certifications/energy_saving_shanghai_2nd_coldchain_2025.jpg' },
            { category: 'competition certifications', name: '上海海洋大学节能减排校内选拔赛 三等奖——智冷绿运 · 队员（2025）', img: 'assets/competition_certifications/energy_saving_campus_3rd_coldchain_2025.jpg' },
            { category: 'competition certifications', name: '第十届"汇创青春"上海大学生文化创意作品展示活动 一等奖——学速递 · 队长（2025）', img: 'assets/competition_certifications/huichuang_youth_shanghai_1st_2025.jpg' },
            { category: 'competition certifications', name: '第十四届全国海洋航行器设计与制作大赛 长三角赛区三等奖——智巡探海ROV · 队长（2025）', img: 'assets/competition_certifications/marine_vehicle_rov_delta_3rd_2025.jpg' },
            { category: 'competition certifications', name: '第十五届全国大学生电子商务"三创"挑战赛 校级赛二等奖 · 队长（2025）', img: 'assets/competition_certifications/sanchuang_campus_2nd_2025.jpeg' },
            { category: 'competition certifications', name: '第十五届全国大学生电子商务"三创"挑战赛 校级赛最佳创意奖 · 队长（2025）', img: 'assets/competition_certifications/sanchuang_campus_best_creativity_2025.jpeg' },
            { category: 'competition certifications', name: '市级大学生创新训练计划结项证书——智能外卖双足机器人"智送小侠" · 队长（2026）', img: 'assets/competition_certifications/dachuang_municipal_biped_delivery_2026.jpg' },
            { category: 'competition certifications', name: '校级大学生创新训练计划结项证书——支持语音交互的全自动智能窗 · 队员（2026）', img: 'assets/competition_certifications/dachuang_campus_smart_window_2026.jpg' },
            { category: 'Internship certificate', name: '广西柳药集团实习证明（智能决策与Agent算法研发，2026.07-2026.09）', img: 'assets/internship_certificate/liuyao_internship_certificate_cn.jpg' },
            { category: 'Internship certificate', name: 'Internship Certificate — Guangxi Liuyao Group (英文版)', img: 'assets/internship_certificate/liuyao_internship_certificate_en.jpg', hidden: true },
            { category: 'Internship certificate', name: '柳州乾锦智能装备实习证明（机器人视觉检测，2026.01-2026.04）', img: 'assets/internship_certificate/qianjin_internship_certificate_cn.jpg' },
            { category: 'Internship certificate', name: 'Internship Certificate — Qianjin Intelligent Equipment (英文版)', img: 'assets/internship_certificate/qianjin_internship_certificate_en.jpg', hidden: true },
            { category: 'Language Test Report Form', name: '雅思成绩单（2026.09.13，总分6.0）', img: 'assets/language_test_report_form/ielts_trf_2026_09_13.jpg' },
            { category: 'Language Test Report Form', name: '雅思成绩单（2026.09.02，总分6.0）', img: 'assets/language_test_report_form/ielts_trf_2026_09_02.jpg' },
            { category: 'Language Test Report Form', name: '雅思成绩单（2026.07.29，总分6.0，阅读7.0）', img: 'assets/language_test_report_form/ielts_trf_2026_07_29.jpg' },
            { category: 'Language Test Report Form', name: '全国大学英语四级成绩报告单（2023.12，437分）', img: 'assets/language_test_report_form/cet4_report_2023.jpg' },
            { category: 'letters of recommendation', name: '导师推荐信 — Prof. Tian（工程学院讲师，海洋机器人方向）', img: 'assets/letters_of_recommendation/LOR_Xiong_Yang_Prof_Tian.jpg' },
            { category: 'letters of recommendation', name: '导师推荐信 — Prof. Wu（工程中心实验室主任，科创竞赛指导）', img: 'assets/letters_of_recommendation/LOR_Xiong_Yang_Prof_Wu.jpg' },
            { category: 'patent', name: '发明专利申请公布 CN 122664263 A《一种双体船载投料装置》（上海海洋大学，2026）', img: 'assets/patent/patent_cn122664263a_catamaran_feeder.jpg' },
            { category: 'research paper certification', name: 'Spatiotemporal Meta-RL for Multi-USV Adversarial Games（JMSE 2025，第一作者）', img: 'assets/research_paper_certification/paper_jmse_multi_usv_meta_rl_2025.png' },
            { category: 'research paper certification', name: 'Orchard-YOLO（Photonics 2026）', img: 'assets/research_paper_certification/paper_photonics_orchard_yolo_2026.jpg' },
            { category: 'research paper certification', name: 'Evolving Collective Intelligence for Unmanned Marine Vehicle Swarms（JMSE 2026）', img: 'assets/research_paper_certification/paper_jmse_federated_meta_learning_2026.jpg' },
            { category: 'research paper certification', name: 'Data-Driven Multi-Scale Channel-Aligned Transformer for Low-Carbon Vessel Operations（JMSE 2025）', img: 'assets/research_paper_certification/paper_jmse_low_carbon_vessel_2025.png' },
            { category: 'research paper certification', name: 'Coral-YOLO（Sensors 2025）', img: 'assets/research_paper_certification/paper_sensors_coral_yolo_2025.jpg' },
            { category: 'research paper certification', name: 'FEGW-YOLO Multi-Crop Detection on Edge Devices（Sensors 2026）', img: 'assets/research_paper_certification/paper_sensors_fegw_yolo_2026.jpg' },
            { category: 'research paper certification', name: 'Graph-Gated Relational Reasoning for Multi-Robot Systems（Sensors 2025）', img: 'assets/research_paper_certification/paper_sensors_graph_gated_multi_robot_2025.jpg' },
            { category: 'research paper certification', name: 'Trustworthy AI-IoT: The IMTPS Framework（Sensors 2026）', img: 'assets/research_paper_certification/paper_sensors_trustworthy_ai_iot_2026.jpg' },
            { category: 'research paper certification', name: 'AUV Swarm Control: Federated Meta-Transfer Learning（JMSE 2026）', img: 'assets/research_paper_certification/paper_jmse_auv_swarm_federated_2026.jpg' },
            { category: 'research paper certification', name: 'Synergistic Hierarchical AI Framework for USV Navigation（Sensors 2025）', img: 'assets/research_paper_certification/paper_sensors_usv_navigation_2025.png' },
            { category: 'research paper certification', name: 'DenseFish-v13 Underwater Fish Detection（Symmetry 2026）', img: 'assets/research_paper_certification/paper_symmetry_densefish_v13_2026.jpg' },
            { category: 'research paper certification', name: 'Predictive Safety Control for Autonomous Surface Vehicles（Symmetry 2026）', img: 'assets/research_paper_certification/paper_symmetry_predictive_safety_asv_2026.jpg' },
            { category: 'scholarship certificate', name: '上海海洋大学单项奖学金"专业成就奖"（2024-2025学年春季学期）', img: 'assets/scholarship_certificate/scholarship_professional_achievement_2025.jpg' },
            { category: 'scholarship certificate', name: '上海海洋大学单项奖学金"发明创造奖"（证书一，2024-2025学年春季学期）', img: 'assets/scholarship_certificate/scholarship_invention_award_2025_1.jpg' },
            { category: 'scholarship certificate', name: '上海海洋大学单项奖学金"发明创造奖"（证书二，2024-2025学年春季学期）', img: 'assets/scholarship_certificate/scholarship_invention_award_2025_2.jpg' },
            { category: 'scholarship certificate', name: '上海海洋大学单项奖学金"发明创造奖"（证书三，2024-2025学年春季学期）', img: 'assets/scholarship_certificate/scholarship_invention_award_2025_3.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '雷锋日志愿服务志愿者证书（2026）', img: 'assets/volunteer_and_student_activity_certificate/volunteer_leifeng_day_2026.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '社团文化节志愿活动志愿者证书（2026）', img: 'assets/volunteer_and_student_activity_certificate/volunteer_club_culture_festival_2026.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '第五届"蔚蓝创新"大学生科创训练营优秀志愿者（2024）', img: 'assets/volunteer_and_student_activity_certificate/volunteer_weilan_camp_2024.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '校运动会志愿服务证书（2023-2024学年）', img: 'assets/volunteer_and_student_activity_certificate/volunteer_sports_meeting_2023.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '上海市无偿献血证（2024）', img: 'assets/volunteer_and_student_activity_certificate/blood_donation_cert_2024.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '共青团工程学院委员会科创管理部干事聘书（2023-2024）', img: 'assets/volunteer_and_student_activity_certificate/appointment_youth_league_st_dept_2023.jpg' },
            { category: 'Volunteer and Student Activity Certificate', name: '工程学院学生骨干培训班结业证书（2023）', img: 'assets/volunteer_and_student_activity_certificate/student_leader_training_2023.jpg' }
        ];

        // 分类按钮按简历逻辑排序：论文认证 → 专利 → 实习证明 → 竞赛获奖 → 奖学金 → 语言考试 → 志愿活动 → 推荐信
        const categoryOrder = [
            'research paper certification',
            'patent',
            'Internship certificate',
            'competition certifications',
            'scholarship certificate',
            'Language Test Report Form',
            'Volunteer and Student Activity Certificate',
            'letters of recommendation'
        ];
        certifications.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));

        // 获取所有分类（数组顺序即按钮顺序）
        const categories = [...new Set(certifications.map(cert => cert.category))];
        
        // 渲染分类按钮
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = getCategoryDisplayName(category);
            btn.addEventListener('click', (e) => filterCertificates(category, certifications, e.currentTarget));
            categoriesContainer.appendChild(btn);
        });

        // 设置默认选中第一个分类
        if (categories.length > 0) {
            filterCertificates(categories[0], certifications, categoriesContainer.firstChild);
        }
    }

    // 获取分类显示名称
    function getCategoryDisplayName(category) {
        const displayNames = {
            'competition certifications': '竞赛获奖',
            'Internship certificate': '实习证明',
            'Language Test Report Form': '语言考试',
            'letters of recommendation': '推荐信',
            'patent': '专利证书',
            'research paper certification': '论文认证',
            'scholarship certificate': '奖学金',
            'Volunteer and Student Activity Certificate': '志愿活动'
        };
        return displayNames[category] || category;
    }

    // 过滤证书（hidden:true 的英文版不在默认列表，通过隐蔽开关查看）
    let showingEnglish = false;
    let currentCategory = '';

    function filterCertificates(category, certifications, activeBtn) {
        currentCategory = category;
        showingEnglish = false;
        // 更新按钮状态
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (activeBtn) activeBtn.classList.add('active');

        renderCertGrid(category, certifications);
    }

    function renderCertGrid(category, certifications) {
        const gridContainer = document.getElementById('certifications-grid');

        // 隐蔽的中英文切换：仅当该分类存在英文版时出现
        const parent = gridContainer.parentNode;
        parent.querySelectorAll('.lang-toggle-row').forEach(el => el.remove());
        if (certifications.some(c => c.category === category && c.hidden)) {
            const row = document.createElement('div');
            row.className = 'lang-toggle-row';
            const hint = document.createElement('span');
            hint.className = 'lang-hint';
            hint.textContent = '该分类证书有中英文双语版本：';
            const toggle = document.createElement('button');
            toggle.className = 'lang-toggle';
            toggle.textContent = showingEnglish ? '← 查看中文版' : '查看英文版 English';
            toggle.addEventListener('click', () => {
                showingEnglish = !showingEnglish;
                renderCertGrid(category, certifications);
            });
            row.appendChild(hint);
            row.appendChild(toggle);
            parent.insertBefore(row, gridContainer);
        }

        // 过滤并渲染证书
        const filtered = certifications.filter(cert => cert.category === category && (showingEnglish ? cert.hidden : !cert.hidden));
        gridContainer.innerHTML = '';
        filtered.forEach((cert, index) => {
            const certCard = document.createElement('div');
            certCard.className = 'certificate-card';
            certCard.innerHTML = `
                <div class="certificate-image">
                    <img src="${cert.img}" alt="${cert.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span>📄</span>'">
                </div>
                <div class="certificate-name">${cert.name}</div>
            `;
            
            // 添加点击事件
            certCard.addEventListener('click', () => openLightbox(cert.img, cert.name, index, filtered));
            gridContainer.appendChild(certCard);
        });
    }

    // Lightbox功能
    let currentImageIndex = 0;
    let currentImages = [];

    function openLightbox(src, caption, index, images) {
        currentImageIndex = index;
        currentImages = images;
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        
        lightboxImage.classList.add('loading');
        lightboxImage.onload = () => lightboxImage.classList.remove('loading');
        lightboxImage.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('show');
        
        // 阻止背景滚动
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('show');
        
        // 恢复背景滚动
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        if (currentImageIndex < currentImages.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        } else {
            // 循环到第一张
            currentImageIndex = 0;
            updateLightboxImage();
        }
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        } else {
            // 循环到最后一张
            currentImageIndex = currentImages.length - 1;
            updateLightboxImage();
        }
    }

    function updateLightboxImage() {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        
        const currentCert = currentImages[currentImageIndex];
        lightboxImage.src = currentCert.img;
        lightboxCaption.textContent = currentCert.name;
    }

    // Lightbox事件监听
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-next').addEventListener('click', showNextImage);
    document.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);

    // 灯箱滚轮翻页：向下滚=下一张，向上滚=上一张（带节流）
    let wheelLockTime = 0;
    document.getElementById('lightbox').addEventListener('wheel', function(e) {
        if (!this.classList.contains('show')) return;
        const now = Date.now();
        if (now - wheelLockTime < 350 || Math.abs(e.deltaY) < 8) return;
        wheelLockTime = now;
        if (e.deltaY > 0) showNextImage(); else showPrevImage();
    }, { passive: true });

    // ESC键关闭Lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });

    // 点击背景关闭Lightbox
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    // 回到顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 联系表单提交
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // 简单验证
            if (name && email && message) {
                alert('提交成功！感谢您的留言，我会尽快回复您。');
                contactForm.reset();
            } else {
                alert('请填写完整信息后再提交。');
            }
        });
    }

    // 英雄区科技感动效：粒子网络背景（随鼠标联动）+ 打字机轮播
    function initHero() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 打字机
        // 主标题打字机（Hello 标题逐字打出，完成后光标保留）
        const heroText = document.getElementById('heroText');
        if (heroText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const full = heroText.textContent;
            heroText.textContent = '';
            let i = 0;
            (function typeHero() {
                heroText.textContent = full.slice(0, ++i);
                if (i < full.length) setTimeout(typeHero, 95);
            })();
        }

        if (reducedMotion) return;

        // 粒子网络
        const canvas = document.createElement('canvas');
        canvas.id = 'hero-particles';
        hero.insertBefore(canvas, hero.firstChild);
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];
        const mouse = { x: null, y: null };

        function resize() {
            W = canvas.width = hero.offsetWidth;
            H = canvas.height = hero.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        hero.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        hero.addEventListener('mouseleave', function() {
            mouse.x = null; mouse.y = null;
        });

        const count = Math.min(90, Math.floor(W * H / 16000));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                r: Math.random() * 1.8 + 0.6
            });
        }

        (function loop() {
            ctx.clearRect(0, 0, W, H);
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(96, 165, 250, 0.75)';
                ctx.fill();
            }
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < 130) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = 'rgba(59, 130, 246, ' + ((1 - d / 130) * 0.35).toFixed(3) + ')';
                        ctx.stroke();
                    }
                }
                if (mouse.x !== null) {
                    const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                    if (d < 180) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = 'rgba(6, 182, 212, ' + ((1 - d / 180) * 0.5).toFixed(3) + ')';
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(loop);
        })();
    }

    // 初始化页面
    renderProjects();
    renderCertifications();
    // 预载英文版证明大图（首次点击灯箱秒开）
    ["assets/internship_certificate/liuyao_internship_certificate_en.jpg",
     "assets/internship_certificate/qianjin_internship_certificate_en.jpg"].forEach(src => {
        const warm = new Image();
        warm.src = src;
    });
    initHero();

    // 添加滚动时的导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });
});