import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { EditorialSectionHeader } from '@/components/editorial/SectionHeader';

const faqItems = [
  {
    question: '点薪云适合哪些类型的企业？',
    answer:
      '适用于存在灵活用工场景的企业，例如外卖配送、网约车、物流仓储、家政服务与零售门店等。我们支持从中小团队到多城市集团化运营。',
  },
  {
    question: '从接入到上线一般需要多久？',
    answer:
      '标准化接入通常 3-7 个工作日可完成。若涉及 API 深度对接、报表定制或多主体管理，通常在 2-4 周内分阶段上线。',
  },
  {
    question: '你们如何保障结算与税务合规？',
    answer:
      '平台提供实名校验、合同留痕、发薪记录与税务处理能力，并支持风控策略配置和全流程可追溯，帮助企业满足审计与合规要求。',
  },
  {
    question: '保险保障如何计费与生效？',
    answer:
      '支持按天计费、按人投保，次日生效。企业可按业务波峰灵活开通，降低固定成本，同时获得工伤与意外场景保障。',
  },
  {
    question: '如何开始试用或获得评估方案？',
    answer:
      '可在“联系我们”页面提交需求，我们会根据行业、人数规模、发薪频次给出初步方案与上线计划，并安排顾问跟进。',
  },
];

export default function FAQ() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <EditorialSectionHeader
            label="FAQ / 常见问题"
            title={
              <>
                问答目录：<span className="text-gold-grad">更像知识页</span>
              </>
            }
            desc="把用户最关心的问题提前说明，降低沟通门槛与决策成本。"
            align="left"
          />
        </motion.div>

        <Accordion type="single" collapsible className="w-full border-t border-[rgba(20,18,14,0.12)]">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-b border-[rgba(20,18,14,0.12)] px-1"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-[hsl(var(--ink))] hover:no-underline py-5">
                <span className="flex items-baseline gap-3">
                  <span className="text-xs tracking-[0.18em] text-[rgba(20,18,14,0.55)]">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span>{item.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[rgba(20,18,14,0.72)] leading-relaxed pt-0 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
