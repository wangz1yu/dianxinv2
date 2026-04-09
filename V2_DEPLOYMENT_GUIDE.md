# 点薪云官网 v2：迁移与部署说明（GitHub Pages）

你现在有一份 **不会影响现有 v1 官网** 的前端代码（目录：`dianxinv2/`）。本说明用于把它发布到 **一个全新的 GitHub 仓库** 并部署到 GitHub Pages。

## 1) 创建一个新的 GitHub 仓库（v2）

1. 打开 GitHub → New repository
2. 仓库名建议：`dianxinv2` / `dianxin-site-v2`（任选）
3. 选择 **Public**
4. 不要勾选初始化 README（本地已有完整代码）

## 2) 推送代码到新仓库

在 `dianxinv2` 目录内执行（示例命令）：

```bash
git init
git add .
git commit -m "feat: dianxin site v2"
git branch -M main
git remote add origin https://github.com/<你的账号>/<你的v2仓库名>.git
git push -u origin main
```

## 3) 配置 GitHub Pages（Actions 部署）

本项目已内置 GitHub Actions 工作流：`.github/workflows/deploy.yml`  
只要推送到 `main` 分支就会自动构建并发布 `dist/` 到 Pages。

在仓库 Settings → Pages：

- **Build and deployment** → Source 选择：**GitHub Actions**

然后到 Actions 页签确认 `Deploy to GitHub Pages` workflow 成功运行。

部署完成后，Pages 会给出访问地址，例如：

- `https://<你的账号>.github.io/<你的v2仓库名>/`

## 4) 本地开发与构建

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 5) 关于自定义域名（避免影响 v1 的关键点）

v1 现网若已经绑定了 `dianxin.love` 或其他域名，**v2 不要复用同一个域名**，否则会抢占解析并影响现网。

建议：

- 使用新的子域名，例如 `v2.dianxin.love`
- 或者先用 GitHub Pages 默认域名验证效果，再决定域名切换

如果你暂时不想绑定域名，可以删除/忽略项目中的 `CNAME` 文件（仓库根目录与 `public/` 下可能都存在）。

