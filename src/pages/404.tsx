import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Container, Typography, Box, Stack } from "@mui/material";
import { motion } from "framer-motion";

const SmartButton = dynamic(() => import("@/common/components/SmartButton"), { ssr: false });

export default function Custom404() {
  return (
    <Container component={"main"} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      
      <Image
        src="/assets/img/404.png"
        alt="Ilustración de error 404"
        width={500}
        height={300}
        style={{ maxWidth: "100%", marginBottom: "1rem" }}
        priority
      />

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        ¡Oh no! Esta página no fue encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Puede que hayas seguido un enlace roto o que la página haya sido movida.
      </Typography>

      <Stack spacing={2} direction="column" alignItems="center">
        <Link href="/home" passHref>
          <SmartButton
            label="Volver al inicio"
            variant="contained"
            size="large"
          />
        </Link>
        <Typography variant="body2" color="text.secondary">
          O intenta usar el menú principal para navegar
        </Typography>
      </Stack>
    </Container>
  );
}
