import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

export default function ProjectCard({ title, description, image, sxCard }) {
  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        border: '1px solid rgba(100,255,218,0.12)',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(100,255,218,0.35)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
        },
        ...sxCard,
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          loading="lazy"
          sx={{ transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.04)' } }}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x200/0a192f/64ffda?text=' + encodeURIComponent(title);
          }}
        />
      </Box>
      <CardContent
        sx={{
          bgcolor: 'rgba(10,25,47,0.97)',
          px: 2.5,
          py: 2,
          borderTop: '1px solid rgba(100,255,218,0.15)',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{ letterSpacing: 0.3, color: '#64ffda', fontSize: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: '#8892b0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
