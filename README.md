# Nuage – App Electron Nextcloud (version originale pour architecture Apple Silicon)

⚠️ **Pour une version où l'on peut choisir l'url de son instance et le type d'architecture (Intel, Silicon, app universelle) voir la branche** https://github.com/PierreLga456/nuage-electron/tree/multi-arch-buid

---

App Electron macOS native encapsulant l'instance Nextcloud personnelle :  
👉 https://nuage.lann.es

## ✅ Fonctionnalités

- Affichage d’un **spinner** à chaque chargement de page
- Support complet des **notifications**
- Autorisation automatique **caméra / micro** pour Nextcloud Talk
- Icône personnalisée `.icns` intégrée (mode sombre compatible)
- Optimisé pour **Apple Silicon (M1/M2/M3/M4)**, sans Rosetta
- Léger, sans surcouche inutile, 100 % local

---

## 🧪 Installation locale (dev)

```bash
git clone https://github.com/<TonUser>/nuage-electron.git
cd nuage-electron
npm install
npm start
```

---

## 🛠️ Build (packaging .app)

```bash
npm run pack
```

- L’app sera disponible dans `dist/Nuage.app`
- Signée localement pour usage personnel
- Peut être déplacée dans `/Applications`

---

## 📦 Structure

```
nuage-electron/
├── main.js               → Configuration fenêtre Electron
├── preload.js            → Spinner injecté dans le DOM distant
├── package.json          → Dépendances + config electron-builder
├── assets/
│   └── Nuage.icns        → Icône de l’application
```

---

## 🔒 Permissions requises

- Notifications (gérées par Electron)
- Caméra / Micro (déclarés dans `Info.plist` via `build.mac.extendInfo`)

---

## ⚠️ Sécurité

- `contextIsolation` est **désactivé** pour permettre l’injection du spinner.
- Ce compromis est **acceptable** pour un usage local unique (SPA contrôlé).
- Pour une version publique, préférer une stratégie Splash Window isolée.

---

## 📁 Localisation possible

Copie manuelle vers :

```bash
sudo cp -R dist/Nuage.app /Applications/
```

---

## 📚 À faire / TODO

- [ ] Signature Apple / notarisation si usage partagé
- [ ] Intégration d’une SplashWindow optionnelle
- [ ] Export `.dmg` + script de mise à jour auto
