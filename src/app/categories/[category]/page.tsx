import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Category } from '@prisma/client';

const validCategories = ['Jobs', 'Internships', 'Events', 'StudyGroups', 'Social', 'Clubs'];

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  if (!validCategories.includes(category)) return notFound();

  const flyers = await prisma.flyer.findMany({
    where: { category: category as Category },
  });

  return (
    <main className="category-page">
      <Container className="py-5">
        <div className="category-header">
          <h1 className="category-title">{category}</h1>
          <p className="category-subtitle">Browse all {category} flyers</p>
        </div>
        <pre>{JSON.stringify(flyers, null, 2)}</pre>
      </Container>
    </main>
  );
};

export default CategoryPage;