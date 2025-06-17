'use client'

import Head from 'next/head'
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material'
import Grid from '@mui/material/GridLegacy'
import RocketIcon from '@mui/icons-material/Rocket'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

import Link from 'next/link'
import Image from 'next/image'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Head>
        <title>Avan | Automatización Inteligente</title>
        <meta name="description" content="Avan transforma la forma en la que automatizas procesos y gestionas tus sistemas con una plataforma moderna, segura y escalable." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ backgroundColor: '#f9f9fb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Hero Section */}
        <Box flex={1}>
          <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 14 }, pb: 10 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
              <Box flex={1}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Typography
                    variant="h2"
                    fontWeight={800}
                    gutterBottom
                    sx={{
                      fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
                      lineHeight: 1.2
                    }}
                  >
                    Automatiza con inteligencia y escala sin límites.
                  </Typography>

                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 550 }}
                  >
                    Con Avan, puedes desplegar, automatizar y proteger tu infraestructura en minutos. Optimiza tu flujo de trabajo con herramientas DevOps modernas.
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link href="/auth">
                        <Button variant="contained" size="large" sx={{ px: 4 }}>
                          Comenzar ahora
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link href="#pricing">
                        <Button variant="outlined" size="large" sx={{ px: 4 }}>
                          Ver precios
                        </Button>
                      </Link>
                    </motion.div>
                  </Stack>
                </motion.div>
              </Box>

              <Box flex={1}>
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                    src="/assets/img/landing.png"
                    alt="Ilustración Avan"
                    width={600}
                    height={400}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </motion.div>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 4, textAlign: 'center', backgroundColor: '#f1f1f1', color: 'text.secondary' }} component="footer">
          <Typography variant="body2">
            © {new Date().getFullYear()} Avan. Todos los derechos reservados.
          </Typography>
        </Box>
      </main>
    </>
  )
}

