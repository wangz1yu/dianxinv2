import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { getPageVisual } from "@/lib/siteVisual";
import { getAttribution, trackEvent } from "@/lib/analytics";

const contactInfo = [
  { icon: Phone, title: "联系电话", content: "17340094007" },
  { icon: Mail, title: "电子邮箱", content: "wangziyu@dianxingg.com.cn" },
  {
    icon: MapPin,
    title: "公司地址",
    content: "安徽省合肥市蜀山区南七街道望江西路华润五彩国际1303室",
  },
  { icon: Clock, title: "服务时间", content: "周一至周日 9:00-21:00" },
];

interface ContactFormData {
  identity: "企业" | "渠道" | "求职";
  monthlyHeadcount: string;
  industry: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    identity: "企业",
    monthlyHeadcount: "",
    industry: "",
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canNext = useMemo(() => {
    if (step === 1) return Boolean(formData.identity);
    if (step === 2) return Boolean(formData.monthlyHeadcount && formData.industry);
    return true;
  }, [step, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        attribution: getAttribution(),
      };

      // GitHub Pages 是静态站点：/api/contact 会返回 404.html（HTML），导致 JSON 解析报错。
      // 因此生产环境默认走 Formspree（同时更适配无后端部署）。
      const response = await fetch('https://formspree.io/f/mpqjabyr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let msg = "提交失败，请稍后重试";
        try {
          const result = await response.json();
          msg = result?.error || result?.message || msg;
        } catch {
          const text = await response.text();
          if (text) msg = text.slice(0, 180);
        }
        throw new Error(msg);
      }

      trackEvent("contact_submit", {
        identity: formData.identity,
        industry: formData.industry,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setStep(1);
        setFormData({
          identity: "企业",
          monthlyHeadcount: "",
          industry: "",
          name: "",
          phone: "",
          email: "",
          company: "",
          message: "",
        });
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败，请检查网络连接");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {(() => {
        const visual = getPageVisual("about/contact");
        return (
          <PageHero
            title={
              <>
                联系顾问
                <span className="block text-blue-700">用 3 步把需求描述清楚</span>
              </>
            }
            desc="留下行业、规模与当前痛点，我们会基于你的口径给出“接入节奏 + 风险边界 + 资料清单”的建议。"
            primaryHref="/about/contact"
            primaryText="提交咨询"
            secondaryHref="/downloads"
            secondaryText="下载资料包"
            visualSrc={visual.src}
            visualPos={visual.pos}
          />
        );
      })()}

      <SectionNav
        items={[
          { id: "form", label: "咨询表单" },
          { id: "info", label: "联系方式" },
          { id: "cta", label: "下一步" },
        ]}
      />

      <section className="py-16 bg-[#F5F7FA] border-b border-gray-100" id="form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">在线咨询</h2>
              <p className="mt-2 text-sm text-gray-500">步骤 {step}/3</p>

              <div className="mt-6">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      提交成功
                    </h3>
                    <p className="text-gray-600">
                      我们已收到你的信息，顾问将尽快与您联系。
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          第一步：你的身份
                        </label>
                        <select
                          name="identity"
                          className="w-full border rounded-2xl h-11 px-3 bg-white"
                          value={formData.identity}
                          onChange={handleInputChange}
                        >
                          <option value="企业">企业</option>
                          <option value="渠道">渠道合作</option>
                          <option value="求职">求职咨询</option>
                        </select>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            第二步：每月业务量级（人数）
                          </label>
                          <Input
                            name="monthlyHeadcount"
                            value={formData.monthlyHeadcount}
                            onChange={handleInputChange}
                            placeholder="如 5000"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            行业类型
                          </label>
                          <Input
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            placeholder="如 外卖/网约车/物流"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            name="name"
                            placeholder="姓名"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <Input
                            name="phone"
                            placeholder="电话"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="邮箱"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <Input
                          name="company"
                          placeholder="公司名称"
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                        <Textarea
                          name="message"
                          placeholder="需求说明（例如：城市覆盖、结算口径、票税与风控关注点）"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="min-h-[110px]"
                          required
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      {step > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 rounded-2xl bg-white/70"
                          onClick={() => setStep((v) => v - 1)}
                        >
                          上一步
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-2xl"
                          onClick={() => {
                            if (canNext) {
                              trackEvent("contact_step_next", {
                                step,
                                identity: formData.identity,
                              });
                              setStep((v) => v + 1);
                            }
                          }}
                        >
                          下一步
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
                          disabled={loading}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {loading ? "提交中..." : "提交咨询"}
                        </Button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm" id="info">
              <h2 className="text-2xl font-semibold text-gray-900">联系方式</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                如需签署保密协议或对接资料清单，也可通过以下方式联系。
              </p>

              <div className="mt-8 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#F5F7FA] p-5"
                  >
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-700">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {item.title}
                      </div>
                      <div className="mt-1 text-gray-600 leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800" id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-10 md:flex md:items-center md:justify-between gap-8">
            <div className="text-white">
              <div className="text-2xl font-semibold">还不确定投入与节省空间？</div>
              <div className="mt-2 text-white/80 leading-relaxed">
                你也可以先用 ROI 试算器做一个粗算，再带着数据和顾问一起拆解口径与交付路径。
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex flex-wrap gap-3">
              <Link to="/roi-calculator">
                <Button className="rounded-full px-8">先做 ROI 试算</Button>
              </Link>
              <Link to="/downloads">
                <Button variant="outline" className="rounded-full px-8 bg-white/90">
                  下载资料包
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
