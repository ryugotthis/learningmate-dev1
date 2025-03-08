import { useNavigate } from 'react-router-dom';
import { useDeleteLectureForMe } from '../../../../entities/recomended/hooks/useDeleteLecturesForMe';
import { MoreOptionsButton } from '../../../../features/recommended/MoreOptionsButton';
import { LinkIcon } from '../../../../shared/ui/icons/LinkIcon';
import { useReissue } from '../../../../entities/auth/hooks/useReissue';

export const OptionsMenu = ({
  name,
  postId,
}: {
  name: string;
  postId: number;
}) => {
  const navigate = useNavigate();

  const { mutateAsync: reissueToken } = useReissue();
  // 날강도 게시글 삭제 mutate
  const { mutate: deleteMutate } = useDeleteLectureForMe();

  const handleDelete = async () => {
    if (window.confirm('삭제하면 이 글은 다시 복구할 수 없어, 삭제 할래?')) {
      try {
        console.log('삭제할 id', postId);

        // 토큰 재발급을 먼저 시도합니다.
        await reissueToken();
        console.log('토큰재발급성공~!');
        // 삭제 API 호출
        deleteMutate(postId);

        navigate('/lectures-for-me');
        // 전체 페이지 새로고침을 위해 window.location.href 사용
        // window.location.href = '/lectures-for-me';
        window.location.reload();
      } catch (error) {
        console.error('삭제 실패:', error);
        navigate('/login');
      }
    }
  };

  return (
    <div className="flex justify-end items-center gap-[24px] text-sm-600 text-font-sub">
      <button className="flex lg:gap-[4px] lg:h-[40px] items-center border border-line p-[12px] lg:px-[24px] lg:py-0 rounded-full lg:rounded-4xl">
        <LinkIcon className="w-[24px] h-[24px]" />

        <span className="hidden lg:inline">링크 복사</span>
      </button>
      <MoreOptionsButton
        handleDelete={handleDelete}
        name={name}
        postId={postId}
      />
    </div>
  );
};
