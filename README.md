/modules/profile
  ├── domain/               <- El corazón del negocio (modelo + lógica pura)
  │   ├── profile.model.ts
  │   ├── profile.entity.ts
  │   ├── profile.repository.ts
  ├── application/          <- Lógica de casos de uso y controladores
  │   ├── useProfileController.ts
  ├── infrastructure/       <- Llamadas API y adaptadores
  │   ├── profile.api.ts
  ├── ui/                   <- Componentes de presentación
  │   ├── ProfileView.tsx
  └── index.ts

