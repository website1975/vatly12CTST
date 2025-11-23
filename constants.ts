import { Chapter } from './types';

export const CURRICULUM: Chapter[] = [
  {
    id: 'chap1',
    title: 'Chương 1: Vật Lí Nhiệt',
    lessons: [
      { id: 'l1', title: 'Bài 1: Sự chuyển thể', chapter: 'Chương 1' },
      { id: 'l2', title: 'Bài 2: Thang nhiệt độ', chapter: 'Chương 1' },
      { id: 'l3', title: 'Bài 3: Nội năng. Định luật 1 của nhiệt động lực học', chapter: 'Chương 1' },
      { id: 'l4', title: 'Bài 4: Nhiệt dung riêng, Nhiệt nóng chảy riêng, Nhiệt hoá hơi riêng', chapter: 'Chương 1' }
    ]
  },
  {
    id: 'chap2',
    title: 'Chương 2: Khí Lý Tưởng',
    lessons: [
      { id: 'l5', title: 'Bài 5: Thuyết động học phân tử chất khí', chapter: 'Chương 2' },
      { id: 'l6', title: 'Bài 6: Định luật Boyle. Định luật Charles', chapter: 'Chương 2' },
      { id: 'l7', title: 'Bài 7: Phương trình trạng thái của khí lí tưởng', chapter: 'Chương 2' },
      { id: 'l8', title: 'Bài 8: Áp suất động học của phân tử khí', chapter: 'Chương 2' }
    ]
  },
  {
    id: 'chap3',
    title: 'Chương 3: Từ Trường',
    lessons: [
      { id: 'l9', title: 'Bài 9: Khái niệm từ trường', chapter: 'Chương 3' },
      { id: 'l10', title: 'Bài 10: Lực từ. Cảm ứng từ', chapter: 'Chương 3' },
      { id: 'l11', title: 'Bài 11: Thực hành đo cảm ứng từ', chapter: 'Chương 3' }
    ]
  },
  {
    id: 'chap4',
    title: 'Chương 4: Vật Lí Hạt Nhân',
    lessons: [
      { id: 'l12', title: 'Bài 12: Cấu trúc hạt nhân', chapter: 'Chương 4' },
      { id: 'l13', title: 'Bài 13: Phản ứng hạt nhân', chapter: 'Chương 4' },
      { id: 'l14', title: 'Bài 14: Phóng xạ và ứng dụng', chapter: 'Chương 4' }
    ]
  }
];

export const INITIAL_MESSAGE = "Xin chào! Mình là trợ lý AI Vật Lý 12. Bạn cần mình giải đáp thắc mắc gì về bài học này?";
