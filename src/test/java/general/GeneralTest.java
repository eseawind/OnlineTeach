package general;

import org.junit.Ignore;
import org.junit.Test;

/**
 * @author mindfine 一些普通测试，测试一些小算法等等
 */
@Ignore
public class GeneralTest {
	@Test
	public void test1() {
		int spaceCounts = 0;

		String topic = "我是一只@space@，想要@space@呀@space@，却飞也飞不高～～";
		String tmp = topic;
		if(-1 == tmp.indexOf("@space@")) return;
		String s1, s2, s = "";
		int index = -1, i = 0;
		while(-1 != (index = tmp.indexOf("@space@"))) {
			System.out.println("_____" + tmp);
			s1 = tmp.substring(0, index + 7);
			s2 = tmp.substring(index + 7, tmp.length());
			s += s1.replace("@space@", "@" + (i++) + "@");
			System.out.println(s1 + '_' + s2 + "_" + s);
			tmp = s2;
		}
		System.out.println(s);
//		int curTemp = 0;
//		while (curTemp != -1) {
//			System.out.println(curTemp);
//			curTemp = topic.indexOf("@space@", curTemp + "@space@".length());
//			spaceCounts++;
//		}
//
//		System.out.println(spaceCounts);
	}

	@Test
	public void test2() {
		String s = "下面名字中谁是猴子？@newline@A.孙悟空@newline@B.猪八戒@newline@C.沙悟净@newline@D.唐僧";
		System.out.println(s.substring(s.indexOf("A" + "."), s.indexOf("B"
				+ ".")));
	}
}
