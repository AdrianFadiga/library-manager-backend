import { Book } from '@prisma/client';
import { prisma } from '../prismaClient';

async function main() {
  const options: Book[] = [
    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },
    {
      id: 'e243499f-070a-4470-a70d-72fb3ab6b1d5',
      title: 'It - A Coisa',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/91g9Dvtf+jL.jpg',
    },
    {
      id: '16e26751-f33a-4119-9fa5-164b3cfab6d1',
      title: 'Boneco De Neve',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl:
        'https://www.guiadasemana.com.br/contentFiles/image/opt_w1024h1024/2020/03/FEA/65077_livros-de-suspense.jpg',
    },
    {
      id: '2b9aa343-4705-452d-818f-ed8feaca8e46',
      title: 'Caixa de Pássaros',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl:
        'https://cdn.culturagenial.com/imagens/caixa-de-passaros-0-cke.jpg',
    },
    {
      id: '833a4564-b599-4583-a16e-d6ff6b12a796',
      title: 'Garota Exemplar',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl:
        'https://images-americanas.b2w.io/produtos/112816856/imagens/livro-garota-exemplar/112816856_1_xlarge.jpg',
    },
    {
      id: 'c9aeac93-11fe-4101-82ee-62577e6b9dbd',
      title: 'A Paciente Silenciosa',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/91R8S52UP6L.jpg',
    },
    {
      id: '4c1699da-7a8f-4c51-9a25-9ac66a5e9fad',
      title: 'Garota No Gelo',
      categoryId: 'db6c44ae-605f-484b-885c-fa610e6802e',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl:
        'https://www.inlivros.net/wp-content/uploads/livro-suspense-e-romance-1.jpg',
    },
  ];

  setTimeout(async () => {
    for (const option of options) {
      await prisma.book.create({
        data: { ...option },
      });
    }
  }, 500);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
