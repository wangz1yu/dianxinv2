import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { assetUrl } from '@/lib/assets';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';
import { PaperPanel } from '@/components/editorial/PaperPanel';

const qualifications = [
  {
    id: 'soft-copyright',
    title: '软件著作权',
    thumbImage: assetUrl('images/qualifications/qualification-1-thumb.svg'),
    fullImage: assetUrl('images/qualifications/qualification-1.svg'),
    summary: '公司拥有多项软件著作权，覆盖核心平台模块',
    detail:
      '本公司已取得若干软件著作权，覆盖订单处理、结算报表、对接 API 等核心能力。证书号与详细信息可在此查看。',
  },
  {
    id: 'info-service',
    title: '信息系统安全等级保护',
    thumbImage: assetUrl('images/qualifications/qualification-2-thumb.svg'),
    fullImage: assetUrl('images/qualifications/qualification-2.svg'),
    summary: '已备案并具备信息安全等级保护',
    detail:
      '本平台系统具备公安部二级安全等级保护备案。',
  },
  {
    id: 'online-data',
    title: '在线数据处理与交易处理业务、信息服务业务、互联网信息服务资质',
    thumbImage: assetUrl('images/qualifications/qualification-3-thumb.svg'),
    fullImage: assetUrl('images/qualifications/qualification-3.svg'),
    summary: '支持在线数据处理与交易处理的系统能力',
    detail:
      '系统支持高并发在线数据处理与交易流程，提供 API 与可视化管理后台，满足企业级使用场景。',
  },
];

export default function Qualifications() {
  const [selected, setSelected] = useState(qualifications[0]);
  const handleSelectQualification = useCallback(
    (q: typeof qualifications[0]) => {
      setSelected(q);
    },
    []
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.05,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
    }),
    []
  );

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EditorialSectionHeader
            label="QUALIFICATIONS / 资质展示"
            title={
              <>
                目录 + 说明页：<span className="text-gold-grad">像白皮书附录</span>
              </>
            }
            desc="保留原弹窗预览功能，但改成“证照目录 + 说明页”的画册结构。"
          />
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Left: directory */}
          <div className="lg:col-span-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="border-t border-[rgba(20,18,14,0.12)]"
            >
              {qualifications.map((q) => (
                <motion.button
                  key={q.id}
                  variants={itemVariants}
                  className="relative w-full text-left py-4"
                  onClick={() => handleSelectQualification(q)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-[rgba(20,18,14,0.12)] pb-4">
                    <div>
                      <div className="font-display text-base tracking-[-0.01em] text-[hsl(var(--ink))]">
                        {q.title}
                      </div>
                      <div className="mt-2 text-xs leading-[1.55] text-[rgba(20,18,14,0.55)]">
                        {q.summary}
                      </div>
                    </div>
                    <span className="text-[11px] tracking-[0.18em] uppercase text-[rgba(20,18,14,0.55)]">
                      CERT
                    </span>
                  </div>
                  {selected.id === q.id ? (
                    <span className="absolute left-0 -bottom-px h-[3px] w-28 bg-gold-grad" />
                  ) : null}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right: detail panel */}
          <div className="lg:col-span-7">
            <PaperPanel className="p-6 sm:p-7">
              <div className="text-xs tracking-[0.22em] uppercase text-[rgba(20,18,14,0.55)]">
                SELECTED / 选中资质
              </div>
              <h4 className="mt-2 font-display text-[1.4rem] tracking-[-0.02em] text-[hsl(var(--ink))]">
                {selected.title}
              </h4>
              <p className="mt-2 text-sm leading-[1.75] text-[rgba(20,18,14,0.72)]">
                {selected.detail}
              </p>

              <motion.div
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-4 rounded-[14px] overflow-hidden border border-[rgba(20,18,14,0.10)] bg-white/60"
              >
                <img
                  src={selected.thumbImage}
                  alt={selected.title}
                  className="w-full h-44 object-contain"
                  loading="lazy"
                />
              </motion.div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full bg-white/60">
                      放大预览
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="w-full">
                      <img
                        src={selected.fullImage}
                        alt={selected.title}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4">
                      <DialogTitle>{selected.title}</DialogTitle>
                      <DialogDescription>{selected.detail}</DialogDescription>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <DialogClose asChild>
                        <Button className="rounded-full">关闭</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>

                <a href={selected.fullImage} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full">下载资质</Button>
                </a>
              </div>
            </PaperPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
